// 시간, 배터리 업데이트
let batteryPercentage = 100;

function updateClock() {
  const clockElement = document.querySelector('.time');  
  const now = new Date();
  
  const year = String(now.getFullYear()).slice(-2);
  //문자열의 길이가 2가 될 때까지 앞쪽에 0 추가
  const month = String(now.getMonth()+1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  clockElement.textContent = `${year}.${month}.${day}\n${hours}:${minutes}:${seconds}`;
  
  // 배터리 감소
  if (batteryPercentage > 0) {
    document.querySelector('.battery-text').textContent = `${batteryPercentage}%`;
    document.querySelector('.battery-level').style.width = `${batteryPercentage}%`;
    
    
    if (batteryPercentage > 50 && batteryPercentage <= 75)  {
      document.querySelector('.battery-level').style.backgroundColor = '#ffc801';
    } else if (batteryPercentage > 25 && batteryPercentage <= 50) {
      document.querySelector('.battery-level').style.backgroundColor = '#fe7753';
    } else if (batteryPercentage <= 25) {
      document.querySelector('.battery-level').style.backgroundColor = '#ff0101';
    }
    batteryPercentage -= 1;
  } else {
    document.querySelector('.battery-text').textContent = '0%';
    document.querySelector('.battery-level').style.width = '0%';
    clockElement.style.color = '#f9f9f9';
    clearInterval(updateInterval);  // 배터리 0% 되면 멈춤
  }
}

const updateInterval = setInterval(updateClock, 1000); // 1초마다 시간, 배터리 갱신
updateClock(); // 바로 한 번 호출하여 초기화


// 알람 설정
let setHour = 0;
let setMinute = 0;
let setSecond = 0;
let alarmList = [];
const alarmListDisplay = document.querySelector('.alarm-item');  

document.querySelectorAll('.alarm-btn button').forEach(button => {
  button.addEventListener('click', () => {
    
    if (button.classList.contains('hh')) {
      setHour = prompt("Enter hour (0-23):", setHour);
      setHour = parseInt(setHour);
      if (isNaN(setHour) || setHour < 0 || setHour > 23) {
        alert("Invalid hour! Please enter a valid hour between 0 and 23.");
        setHour = 0;
      }
    } else if (button.classList.contains('mm')) {
      setMinute = prompt("Enter minute (0-59):", setMinute);
      setMinute = parseInt(setMinute);
      if (isNaN(setMinute) || setMinute < 0 || setMinute > 59) {
        alert("Invalid minute! Please enter a valid minute between 0 and 59.");
        setMinute = 0;
      }      
    } else if (button.classList.contains('ss')) {
      setSecond = prompt("Enter second (0-59):", setSecond);
      setSecond = parseInt(setSecond);
      if (isNaN(setSecond) || setSecond < 0 || setSecond > 59) {
        alert("Invalid second! Please enter a valid second between 0 and 59.");
        setSecond = 0;
      }      
    } else if (button.classList.contains('add')) {
      // + 버튼을 클릭했을 때
      setHour = String(setHour).padStart(2, '0');
      setMinute = String(setMinute).padStart(2, '0');
      setSecond = String(setSecond).padStart(2, '0');
      let setAlarm = `${setHour}:${setMinute}:${setSecond}\n`
      if (alarmList.length < 3) {
        alert(`Alarm added! ${setHour}:${setMinute}:${setSecond}`);
        alarmList.push(setAlarm)
        
        // 새 알람 항목 추가
        const alarmItemDiv = document.createElement('div');
        alarmItemDiv.classList.add('new-alarm-item');
        alarmItemDiv.innerHTML = `
        <span>${setAlarm}</span>
        <button class="remove-btn">x</button>
        `;
            
        // 알람 삭제 버튼 기능
        alarmItemDiv.querySelector('.remove-btn').addEventListener('click', () => {
        alarmList = alarmList.filter(alarm => alarm !== setAlarm);
        alarmItemDiv.remove();
        });

        alarmListDisplay.appendChild(alarmItemDiv);
        
      } else {
        alert("Only up to 3 alarms can be added !");
        
       setHour = 0;
       setMinute = 0;
       setSecond = 0;
      }
    }
  });
});





