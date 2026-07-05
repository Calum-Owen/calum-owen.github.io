---
layout: page
title: Contact
permalink: /contact/
---

# Contact & Dinner Sign-up

Use the form below to sign up for a dinner party. The email address is obfuscated in the source and will open your email client with the sign-up details so responses are delivered to Calum.

<form id="dinner-form">
  <label>Name<br><input type="text" name="name" required></label><br>
  <label>Email (for confirmation)<br><input type="email" name="email" required></label><br>
  <label>Number of guests<br><input type="number" name="guests" min="0" value="1"></label><br>
  <label>Preferred date<br><input type="date" name="date"></label><br>
  <label>Notes<br><textarea name="notes"></textarea></label><br>
  <button type="submit" class="btn-primary">Sign up</button>
</form>

<p id="form-status" style="display:none"></p>

<script>
// Build the recipient email from character codes so it is not plainly visible in the page source
(function(){
  var codes = [99,97,108,117,109,52,51,55,54,64,103,109,97,105,108,46,99,111,109]; // calum4376@gmail.com
  window._recipient = codes.map(function(c){return String.fromCharCode(c)}).join('');
})();

document.getElementById('dinner-form').addEventListener('submit', function(e){
  e.preventDefault();
  var form = e.target;
  var vals = {
    name: form.name.value || 'No name',
    email: form.email.value || 'No email',
    guests: form.guests.value || '1',
    date: form.date.value || 'unspecified',
    notes: form.notes.value || ''
  };
  var subject = encodeURIComponent('Dinner party sign-up from ' + vals.name);
  var body = encodeURIComponent('Name: ' + vals.name + '\nEmail: ' + vals.email + '\nGuests: ' + vals.guests + '\nPreferred date: ' + vals.date + '\n\nNotes:\n' + vals.notes);
  // open user's email client
  window.location.href = 'mailto:' + window._recipient + '?subject=' + subject + '&body=' + body;
  var status = document.getElementById('form-status');
  status.style.display = '';
  status.textContent = 'Your email client should open to send the sign-up — if it does not, copy the details and email us.';
});
</script>

<hr>

<h2>Comments</h2>
<div id="comments">
  <script src="https://utteranc.es/client.js"
          repo="Calum-Owen/calum-owen.github.io"
          issue-term="pathname"
          theme="github-light"
          crossorigin="anonymous"
          async>
  </script>
</div>
