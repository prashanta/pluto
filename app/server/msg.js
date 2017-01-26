/*jshint esversion: 6 */

import Ably from 'ably';
import Promise from 'Bluebird';
import _config from 'config';
import TenantService from './service/tenant';
import * as MachineData from './service/machineData';

var config = _config.default;

var logger = config.logger;

export default class Msg{

  constructor(){
    this.realtime = new Ably.Realtime({ key: 'rss_Lw.7ktoTg:0h0yF67nmvxI3tAQ'});
    this.channel = []; // Array to hold channels for each tenant
  }

  subscribeMDCs(){
    // Get channel IDs for all tenants
    var tenant = new TenantService();

    tenant.getChannelIds().bind(this)
    .then(function(result){
      result.forEach(function(ch, index){
        this.channel[index] = this.realtime.channels.get(ch);
        this.channel[index].subscribe(this.handleMDCMessage);
        this.channel[index].presence.subscribe('enter', this.handleMachineEnter);
        this.channel[index].presence.subscribe('leave', this.handleMachineExit);
      }.bind(this));
      logger.info("Subscribed to %d machine data channel(s)", this.channel.length);
    })
    .catch(function(error){
      logger.log(error);
      throw error;
    });
  }

  // HANDLE MACHINE DATA
  handleMDCMessage(msg){
    // SAVE MACHINE DATA TO DATABASE
    logger.debug(JSON.stringify(msg));
    MachineData.addMachineData(msg.data);
  }

  // HANDLE MACHINE ENTER
  handleMachineEnter(member){
    // TODO Save enter time in database
    logger.debug(member);
    logger.debug('Member ' + member.clientId + ' entered');
  }

  // HANDLE MACHINE LEAVE
  handleMachineExit(member) {
    // TODO Save exit time in database
    logger.debug(member);
    logger.debug('Member ' + member.clientId + ' left');
  }
}
