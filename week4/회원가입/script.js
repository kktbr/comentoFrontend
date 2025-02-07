// 미리 지정된 아이디 목록
const predefinedUserIds = ["existingUser", "testUser123", "johnDoe"]; 

document.getElementById('checkUserIdBtn').addEventListener('click', function() {
  const userId = document.getElementById('userId').value;
  const userIdError = document.getElementById('userIdError');

  // 하드코딩된 아이디 목록에서 중복 체크
  if (predefinedUserIds.includes(userId)) {
    userIdError.textContent = "이미 존재하는 아이디입니다.";
    userIdError.style.color = "red";
  } else {
    userIdError.textContent = "사용 가능한 아이디입니다.";
    userIdError.style.color = "green";
  }
});


// 비밀번호 정상성 체크
function validatePassword(password) {
  const pwdError = document.getElementById('pwdError');
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/]).{8,}$/;

  if (!regex.test(password)) {
    pwdError.textContent = "비밀번호 규칙을 따르세요 (8자 이상, 대소문자, 숫자, 특수문자 포함)";
    pwdError.style.color = "red";
    return false;
  } else {
    pwdError.textContent = "사용 가능한 비밀번호입니다.";
    pwdError.style.color = "green";
    return true;
  }
}

document.getElementById('pwd').addEventListener('input', function() {
  const password = this.value;
  validatePassword(password);
});

