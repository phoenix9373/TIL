const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (nodeId) => {
  try {
    const response = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ""}`, {
      method: "GET",
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`네트워크 에러 (Error Code : ${response.status})`);
    }
  } catch (e) {
    throw new Error("데이터 요청 중 오류가 발생했습니다.");
  }
};
