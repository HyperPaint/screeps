const otherConstantsErrors = {
    /**
     * Функция для преобразования кода ошибки в текстовую константу.
     * @param {Number} errorCode Код ошибки.
     * @returns {String} Текстовая константа и код ошибки. 'OK = 0'
     */
    errorCodeToText: function(errorCode) {
        switch (errorCode) {
            case 0:
                return "OK = " + errorCode;

            case -1:
                return "ERR_NOT_OWNER = " + errorCode;

            case -2:
                return "ERR_NO_PATH = " + errorCode;

            case -3:
                return "ERR_NAME_EXISTS = " + errorCode;

            case -4:
                return "ERR_BUSY = " + errorCode;

            case -5:
                return "ERR_NOT_FOUND = " + errorCode;

            case -6:
                return "ERR_NOT_ENOUGH = " + errorCode;

            case -7:
                return "ERR_INVALID_TARGET = " + errorCode;

            case -8:
                return "ERR_FULL = " + errorCode;

            case -9:
                return "ERR_NOT_IN_RANGE = " + errorCode;

            case -10:
                return "ERR_INVALID_ARGS = " + errorCode;

            case -11:
                return "ERR_TIRED = " + errorCode;

            case -12:
                return "ERR_NO_BODYPART = " + errorCode;

            case -14:
                return "ERR_RCL_NOT_ENOUGH = " + errorCode;

            case -15:
                return "ERR_GCL_NOT_ENOUGH = " + errorCode;

            default:
                return "UNKNOWN = " + errorCode;
        }
    }
};

module.exports = otherConstantsErrors;