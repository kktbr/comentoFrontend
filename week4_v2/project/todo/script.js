let loggedInUserId = sessionStorage.getItem('loggedInUserId');

// 아이디가 존재하면 페이지에 표시하거나 다른 작업을 할 수 있습니다.
if (loggedInUserId) {
  console.log('로그인한 유저 아이디:', loggedInUserId);

  // 유저 아이디를 타이틀에 표시
  document.getElementById('title').textContent = `${loggedInUserId}'s To-Do List 😎`;
} else {
  console.log('로그인되지 않은 사용자');
}
document.getElementById('add-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('to-do');
    const taskText = taskInput.value.trim();
  
    if (taskText) {
      const todoList = document.getElementById('todo-list');
  
      // 리스트 항목 생성
      const li = document.createElement('li');
      const taskDiv = document.createElement('div');

      // 체크박스
      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.classList.add('check-box');
      checkBox.addEventListener('change', function() {
        if (this.checked) {
          li.classList.add('completed');
        } else {
          li.classList.remove('completed');
        }
      });
      taskDiv.appendChild(checkBox);
  
      // 할 일 텍스트
      const taskSpan = document.createElement('span');
      taskSpan.textContent = taskText;
      taskDiv.appendChild(taskSpan);
  
      // 삭제 버튼
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.textContent = '-';
      deleteBtn.addEventListener('click', function() {
        todoList.removeChild(li);
      });
  
      li.appendChild(taskDiv);
      li.appendChild(deleteBtn);
  
      todoList.appendChild(li);
  
      // 입력창 비우기
      taskInput.value = '';
    }
  });
  
  // 엔터 키로도 항목 추가
  document.getElementById('to-do').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      document.getElementById('add-btn').click();
    }
  });
  