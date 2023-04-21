const tinyInput = document.querySelector(".tinyInput")


export default function initEditor(){
    tinyInput.innerHTML =  `  
<textarea>
  Börja författa ditt inlägg här
</textarea>

<button class="sendBtn" action=send>PUBLICERA</button>`



const sendBtn = document.querySelector('.sendBtn')
sendBtn.addEventListener("click", sendBtnFunc)

function sendBtnFunc(){
  console.log("Publiceraknapp");
}


tinymce.init({
selector: 'textarea',
plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
tinycomments_mode: 'embedded',
tinycomments_author: 'Author name',
mergetags_list: [
{ value: 'First.Name', title: 'First Name' },
{ value: 'Email', title: 'Email' },
]
});
};