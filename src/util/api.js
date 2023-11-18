const baseURL = "https://random-backend.digitalcodemasters.info";

export const AUTH_API = {
  register: baseURL + "/auth/register",
  login: baseURL + "/auth/login",
};

export const DASHBOARD_API=baseURL + "/auth/details";

export const USER_API = baseURL + "/auth/users";

export const KEYWORD_API = {
  getAllKeyword: baseURL + "/keywords/",
  createKeyword: baseURL + "/keywords/",
  updateKeyword: baseURL + "/keywords/update",
  deleteKeyword: baseURL + "/keywords/delete",
};

export const JOY_API = {
  createJoy: baseURL + "/asset",
  getAllJoy: baseURL + "/asset/joy",
  updateJoy: baseURL + "/asset/update",
  deleteJoy: baseURL + "/asset/delete/",
};

export const WACK_API = {
  createWack: baseURL + "/asset",
  getAllWack: baseURL + "/asset/wack",
  updateWack: baseURL + "/asset/update",
  deleteWack: baseURL + "/asset/delete/",
};
export const PUZZLE_API = {
  getAllPuzzle: baseURL + "/puzzle/",
  createPuzzle: baseURL + "/puzzle/add",
  updatePuzzle: baseURL + "/puzzle/update/",
  checkAnswerPuzzle: baseURL + "/puzzle/checkAnswer",
  deletePuzzle: baseURL + "/puzzle/delete",
};

export const CATEGORY_API = {
  getAllCategory: baseURL + "/category/",
  createCategory: baseURL + "/category/",
  singleCategory: baseURL + "/category/",
  updateCategory: baseURL + "/category/update/",
  deleteCategory: baseURL + "/category/delete/",
};

export const COMMITMENT_API = {
  createCommitment: baseURL + "/commitmentandstatement/",
  getAllCommitment: baseURL + "/commitmentandstatement/commitment",
  deleteCommitment: baseURL + "/commitmentandstatement/delete",
};

export const STATEMENT_API = {
  createStatement: baseURL + "/commitmentandstatement/",
  getAllStatement: baseURL + "/commitmentandstatement/statement",
  deleteStatment: baseURL + "/commitmentandstatement/delete",
};

export const REPORT_API = {
  getAllReport: baseURL + "/report/",
  reportUserReport: baseURL + "/report/{username}",
  takeActionReport: baseURL + "/report/{report_id}",
};
