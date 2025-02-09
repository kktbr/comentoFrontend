// 아이디 목록
let emails = JSON.parse(localStorage.getItem('emails')) || []; 
let userIds = JSON.parse(localStorage.getItem('userIds')) || []; 
let userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || []; // 아이디-비번 쌍을 저장할 변수

// localStorage에 저장
localStorage.setItem('emails', JSON.stringify(emails));
localStorage.setItem('userIds', JSON.stringify(userIds));
localStorage.setItem('userCredentials', JSON.stringify(userCredentials));

let isEmailValid = null;
let isUserIdValid = null;
let isPasswordValid = null;

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


// 아이디 입력 체크
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

document.getElementById('email').addEventListener('input', function () {
    isEmailValid = validateEmail();
    console.log("이메일 검증 결과:", isEmailValid);
});

document.getElementById('user-id').addEventListener('input', function() {
  const btn = document.getElementById('check-id-btn');
  const userIdError = document.getElementById('user-id-error');
  if (this.value.trim().length > 0) {
    userIdError.textContent = "중복 확인 버튼을 눌러주세요.";
    userIdError.style.color = "red";
    btn.disabled = false;
  }else {
    btn.classList.remove('active');
    userIdError.textContent = "아이디를 입력해주세요.";
    userIdError.style.color = "red";
    btn.disabled = true;
  }
});

document.getElementById('check-id-btn').addEventListener('click', function () {
    const btn = document.getElementById('check-id-btn');   
    btn.classList.add('active');
    isUserIdValid = validateUserId();
    console.log("아이디 검증 결과:", isUserIdValid);
});

document.getElementById('pwd').addEventListener('input', function () {
    isPasswordValid = validatePassword();
    console.log("비밀번호 검증 결과:", isPasswordValid);
});


// 폼 제출 시 기본 동작을 막고 추가 동작 실행
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); // 기본 제출 방지
  console.log('폼 제출 이벤트 발생!');

  console.log("isEmailValid:", isEmailValid);
  console.log("isUserIdValid:", isUserIdValid);
  console.log("isPasswordValid:", isPasswordValid);
  
  if (isUserIdValid === null) {
        alert("아이디 중복 확인을 먼저 해주세요!");
        return;
    }

  // 모든 필드 유효
  if (isEmailValid && isUserIdValid && isPasswordValid) {
    const email = document.getElementById('email').value;
    const userId = document.getElementById('user-id').value;
    const password = document.getElementById('pwd').value;

    emails.push(email); // 이메일 목록에 추가
    userIds.push(userId); // 아이디 목록에 추가
    userCredentials.push({ userId, password }); // 아이디-비밀번호 쌍을 userCredentials에 추가

    // localStorage에 저장
    localStorage.setItem('emails', JSON.stringify(emails)); // 이메일 목록 저장
    localStorage.setItem('userIds', JSON.stringify(userIds)); // 아이디 목록 저장
    localStorage.setItem('userCredentials', JSON.stringify(userCredentials)); // 아이디-비밀번호 쌍 저장


    alert("회원가입을 축하합니다!");
    console.log("회원가입 성공!");

    window.location.href = '/login/index.html';
    
    isEmailValid = null;
    isUserIdValid = null;
    isPasswordValid = null;
    
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

