// 페이지가 로드될 때 로그인 상태 확인
window.addEventListener('load', function() {
  const loggedInUserId = sessionStorage.getItem('loggedInUserId');
  
  // 만약 sessionStorage에 로그인된 아이디가 있다면
  if (loggedInUserId) {
    // 로그인 폼 숨기고, 로그아웃 폼 보여주기
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('logoutForm').style.display = 'block';
    document.getElementById('logged-in-id').textContent = `${loggedInUserId}님, 환영합니다!`;
  } else {
    // 로그인 폼이 보이도록 설정 (초기 상태)
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('logoutForm').style.display = 'none';
  }
});

// localStorage에서 userCredentials 불러오기
let userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || []; // 로컬스토리지에서 저장된 아이디-비밀번호 쌍 불러오기

document.getElementById('user-id').addEventListener('input', function () {
  const loginError = document.getElementById('login-error');  
  loginError.textContent = "";
});

document.getElementById('pwd').addEventListener('input', function () {
  const loginError = document.getElementById('login-error');  
  loginError.textContent = "";
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // 기본 제출 방지
  console.log('로그인 제출 이벤트 발생!');

  const loginUserId = document.getElementById('user-id').value;
  const loginPassword = document.getElementById('pwd').value;
  const loginError = document.getElementById('login-error');

  // 입력 값이 비어있는지 확인
  if (!loginUserId.trim() || !loginPassword.trim()) {
    loginError.textContent = "아이디와 비밀번호를 입력해주세요.";
    return;
  } 
  
  // 로컬스토리지에서 아이디와 비밀번호 검증
  const user = userCredentials.find(u => u.userId === loginUserId && u.password === loginPassword);

  if (user) {
    // 로그인 성공
    loginError.textContent = "";
    alert("로그인 성공!");
    console.log("로그인 성공!");

    // sessionStorage에 로그인된 아이디 저장
    sessionStorage.setItem('loggedInUserId', loginUserId);
    
    // 로그인 후 form 숨기고 user-info 보이기
    document.getElementById('loginForm').style.display = 'none';  // 로그인 폼 숨기기
    document.getElementById('logoutForm').style.display = 'block'; // 로그아웃 폼 보이기
    document.getElementById('logged-in-id').textContent = `${loginUserId}님, 환영합니다!`;

    // 잠시 대기 후 todo 페이지로 이동
    setTimeout(function() {
      window.location.href = '/todo/index.html'; // 이동
    }, 1000); // 1초 후 이동 (원하는 시간으로 조정 가능)

ㄴ
  } else {
    // 로그인 실패
    console.log("로그인 실패!");
    loginError.textContent = "아이디 또는 비밀번호가 잘못되었습니다.";
  }
});

// 로그아웃 처리
document.getElementById('logout-btn').addEventListener('click', function() {
  // sessionStorage에서 로그인된 사용자 정보 삭제
  sessionStorage.removeItem('loggedInUserId');

  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('logoutForm').style.display = 'none';

  document.getElementById('loginForm').reset();
});