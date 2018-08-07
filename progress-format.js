/**
 * @typedef {object} ProgressFormatConfig
 * @property {number} width
 * @property {string} startChar
 * @property {string} endChar
 * @property {string} doneChar
 * @property {string} leftChar
 */

/**
 * @type {ProgressFormatConfig}
 */
const defaultConfig = {
  doneChar: "◼︎",
  endChar: "]",
  startChar: "[",
  leftChar: "◻︎",
  width: 16
};

/**
 * @typedef {number} ValidProgress
 */

/**
 * Checks if progress is less or equal than 100
 * or greater or equal then 0
 * @param {number} progress
 * @returns {ValidProgress}
 */
function validate(progress) {
  if (typeof progress !== "number" || progress < 0 || progress > 100) {
    throw new ProgressTypeError();
  }
  return progress;
}

class ProgressTypeError extends TypeError {
  constructor() {
    super("Progress must be a number in range [0 .. 100]");
  }
}

/**
 * @param {ProgressFormatConfig} config
 * @returns {(progress: number) => string}
 */
exports.createProgressFormatter = function createProgressFormatter(
  config = defaultConfig
) {
  // 2 chars are used for startChar and endChar
  const progressBarLength = config.width - 2;

  return progress => {
    const validProgress = validate(progress);
    const doneCharsLength = Math.floor(
      (validProgress * progressBarLength) / 100
    );
    const leftCharsLength = progressBarLength - doneCharsLength;
    return (
      config.startChar +
      config.doneChar.repeat(doneCharsLength) +
      config.leftChar.repeat(leftCharsLength) +
      config.endChar
    );
  };
};
