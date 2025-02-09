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
    
    // 로그인 후 todo로 이동
    window.location.href = '/todo/index.html';
    sessionStorage.setItem('loggedInUserId', loginUserId);

  } else {
    // 로그인 실패
    console.log("로그인 실패!");
    loginError.textContent = "아이디 또는 비밀번호가 잘못되었습니다.";
  }
});
