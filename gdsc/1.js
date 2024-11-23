function cal(){
  const n=parseFloat(document.getElementById("n").value);
  let sum=0;
  for(let i=1;i<n;i++)
    sum=sum+i;
document.getElementsById("result").textContext=sum;

}