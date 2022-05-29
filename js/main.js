document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const userName = document.querySelector("#userName").value;
  const res = await fetch(`/api?student=${userName}`)
  const data = await res.json()

  console.log(data);
  document.querySelector("#personStatus").textContent = data.flipResult
  document.querySelector("#personName").textContent = data.chooseFlip
  document.querySelector("#personOccupation").textContent = data.flipComp
}