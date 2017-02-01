/*jshint esversion: 6 */

var UserExistError = function () {
  this.message = "User already exist";
  this.name = "UserExistError";
  Error.captureStackTrace(this, UserExistError);
};
UserExistError.prototype = Object.create(Error.prototype);
UserExistError.prototype.constructor = UserExistError;

var WorkcellExistError = function () {
  this.message = "Workcell already exist";
  this.name = "WorkcellExistError";
  Error.captureStackTrace(this, WorkcellExistError);
};
WorkcellExistError.prototype = Object.create(Error.prototype);
WorkcellExistError.prototype.constructor = WorkcellExistError;


export default {
  UserExistError: UserExistError,
  WorkcellExistError: WorkcellExistError
};
