// 아이디 목록
const emails = []; 
const userIds = ["existingUser", "testUser123", "johnDoe"]; 

// 이메일 입력 체크
function validateEmail() {
  const email = document.getElementById('email').value;
  const emailError = document.getElementById('email-error');
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 이메일 형식 검증 먼저 수행
  if (!regex.test(email)) {
    emailError.textContent = "유효한 이메일을 입력하세요.";
    emailError.style.color = "red";
    console.log("이메일 검증 실패");
    return false;
  }

  // 이메일 중복 체크 수행
  if (emails.includes(email)) {
    emailError.textContent = "이미 존재하는 이메일입니다.";
    emailError.style.color = "red";
    console.log("이메일 중복됨");
    return false;
  }

  // 형식도 맞고 중복도 없으면 사용 가능
  emailError.textContent = "사용 가능한 이메일입니다.";
  emailError.style.color = "green";
  console.log("이메일 사용 가능");
  return true;
}


// 아이디 중복 체크
function validateUserId() {
  const userId = document.getElementById('user-id').value;
  const userIdError = document.getElementById('user-id-error');

  if (!userId.trim()) {
    userIdError.textContent = "아이디를 입력해주세요.";
    userIdError.style.color = "red";
    console.log("아이디 입력 안함");
    return false;
  }

  // 아이디 목록에서 중복 체크
  if (userIds.includes(userId)) {
    userIdError.textContent = "이미 존재하는 아이디입니다.";
    userIdError.style.color = "red";
    console.log("아이디 중복됨");
    return false;
  } else {
    userIdError.textContent = "사용 가능한 아이디입니다.";
    userIdError.style.color = "green";
    console.log("아이디 사용 가능");
    return true;
  }
}

// 비밀번호 정상성 체크
function validatePassword() {
  const password = document.getElementById('pwd').value;
  const pwdError = document.getElementById('pwd-error');
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/]).{8,}$/;

  if (!regex.test(password)) {
    pwdError.textContent = "비밀번호 규칙을 따르세요 (8자 이상, 대소문자, 숫자, 특수문자 포함)";
    pwdError.style.color = "red";
    console.log("비밀번호 검증 실패");
    return false;
  } else {
    pwdError.textContent = "사용 가능한 비밀번호입니다.";
    pwdError.style.color = "green";
    console.log("비밀번호 검증 성공");
    return true;
  }
}

// 이메일 입력 시 검사
document.getElementById('email').addEventListener('input', validateEmail);

// 아이디 중복 체크 버튼 클릭 시 실행
document.getElementById('check-id-btn').addEventListener('click', validateUserId);

// 비밀번호 입력 시 검사
document.getElementById('pwd').addEventListener('input', validatePassword);

// 폼 제출 시 기본 동작을 막고 추가 동작 실행
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); // 기본 제출 방지
  console.log('폼 제출 이벤트 발생!');

  // 검증 실행 후 결과 저장
  const isEmailValid = validateEmail();
  const isUserIdValid = validateUserId();
  const isPasswordValid = validatePassword();

  console.log("isEmailValid:", isEmailValid);
  console.log("isUserIdValid:", isUserIdValid);
  console.log("isPasswordValid:", isPasswordValid);

  // 모든 필드 유효
  if (isEmailValid && isUserIdValid && isPasswordValid) {
    const email = document.getElementById('email').value;
    const userId = document.getElementById('user-id').value;
    emails.push(email); // 이메일 목록에 추가
    userIds.push(userId); // 아이디 목록에 추가
    alert("회원가입을 축하합니다!");
    console.log("회원가입 성공!");
    
    document.getElementById('signupForm').reset(); // 폼 초기화

    // 가입 완료 후 에러 메시지 초기화
    document.getElementById('email-error').textContent = "";
    document.getElementById('user-id-error').textContent = "";
    document.getElementById('pwd-error').textContent = "";
  } else {
    alert("모든 정보를 올바르게 입력해주세요.");
    console.log("회원가입 실패: 입력값 오류");
  }
});

