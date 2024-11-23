var typed=new typed(".text",{
  String:["Frontend Developer"],
  typeSpeed:100,
  backSpeed:100,
  backDelay:1000,
  loop:true
})
// JavaScript for the Let's Connect page
document.getElementById('emailButton').addEventListener('click', function() {
  window.location.href = "mailto:your-email@example.com";
});

document.getElementById('toggleTheme').addEventListener('click', function() {
  document.body.classList.toggle('dark-theme');
});
