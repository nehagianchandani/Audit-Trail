/**
 * @author l.azevedo
 * created on 29/06/2017
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.services')
    .service('toasterService', toasterService);

  /** @ngInject */
  function toasterService($window, toastr, toastrConfig) {
    var defaultConfig = angular.copy(toastrConfig);
    this.types = ['success', 'error', 'info', 'warning'];
    this.messages = [
      {
        title: 'Successfull',
        message: 'Record has been successfully inserted!',

      },
      {
        title: 'Error',
        message: 'Something went wrong!'
      },
      {
        title: 'Info',
        message: ''
      },
      {
        title: 'Warning',
        message: 'This might create problems later'
      }];


    var openedToasts = [];
    this.options = {
      autoDismiss: false,
      positionClass: 'toast-top-right',
      timeOut: '5000',
      extendedTimeOut: '2000',
      allowHtml: false,
      closeButton: false,
      tapToDismiss: true,
      progressBar: false,
      newestOnTop: true,
      maxOpened: 0,
      preventDuplicates: false,
      preventOpenDuplicates: false,
    };


    this.clearLastToast = function () {
      var toast = openedToasts.pop();
      toastr.clear(toast);
    };

    this.clearToasts = function () {
      toastr.clear();
    };

    this.openErrorToast = function (msg) {
      var toastType = this.types[1];
      var toastQuote = this.messages[1];
      openedToasts.push(toastr[toastType]('Error', msg));
      this.optionsStr = "toastr." + "Error" + "(\'" + toastQuote.message + "\', \'" + toastQuote.title + "', " + JSON.stringify(toastQuote.options || {}, null, 2) + ")";
    };

    this.openInfoToast = function (msg) {
      var toastType = this.types[2];
      var toastQuote = this.messages[2];
      openedToasts.push(toastr[toastType]('Info', msg));
      this.optionsStr = "toastr." + toastType + "(\'" + toastQuote.message + "\', \'" + toastQuote.title + "', " + JSON.stringify(toastQuote.options || {}, null, 2) + ")";
    };

    this.openWarningToast = function (msg) {
      var toastType = this.types[3];
      var toastQuote = this.messages[3];
      openedToasts.push(toastr[toastType]('Warning', msg));
      this.optionsStr = "toastr." + toastType + "(\'" + toastQuote.message + "\', \'" + toastQuote.title + "', " + JSON.stringify(toastQuote.options || {}, null, 2) + ")";
    };

    this.openSucessToast = function (msg) {
      var toastType = this.types[0];
      var toastQuote = this.messages[0];
      openedToasts.push(toastr[toastType]('Successfull', msg));
      this.optionsStr = "toastr." + toastType + "(\'" + msg + "\', \'" + toastQuote.title + "', " + JSON.stringify(toastQuote.options || {}, null, 2) + ")";
    };


    this.openToast = function () {
      angular.extend(toastrConfig, this.options);
      openedToasts.push(toastr[this.options.type](this.options.msg, this.options.title));
      var strOptions = {};
      for (var o in  this.options) if (o != 'msg' && o != 'title')strOptions[o] = this.options[o];
      this.optionsStr = "toastr." + this.options.type + "(\'" + this.options.msg + "\', \'" + this.options.title + "\', " + JSON.stringify(strOptions, null, 2) + ")";
    };  
  }

})();