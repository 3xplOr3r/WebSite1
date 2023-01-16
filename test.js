//BTN slide Effect

const form = document.querySelector("form"),
        nextBtn = form.querySelector(".nextBtn"),
        backBtn = form.querySelector(".backBtn"),
        allInput = form.querySelectorAll(".first input");


nextBtn.addEventListener("click", ()=> {
    allInput.forEach(input => {
        if(input.value === ""){
            form.classList.add('secActive');
        }else{
            form.classList.remove('secActive');
        }
    })
})

backBtn.addEventListener("click", () => form.classList.remove('secActive'));

//FileUpload 

const Form = document.querySelector(".uarea"),
ip = Form.querySelector(".file-input"),
ProgressArea = document.querySelector(".progress-area"),
UploadedArea = document.querySelector(".uploaded-area");

Form.addEventListener("click", ()=> {
  ip.click();
})

ip.onchange = ({target}) => {
  let file = target.files[0];

    if(file){
      let Filename = file.name;
      if(Filename.length > 12){
        let splitName = Filename.split('.');
        Filename = splitName[0].substirng(0, 12) + "... ." + splitName[1];
      }
      uploadFile(Filename);
    }

}

function uploadFile(name) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/admission.php");
    xhr.upload.addEventListener("progress", ({loaded, total}) => {

      let fileLoaded = Math.floor((loaded / total) * 100);
      let fileTotal = Math.floor(total / 1000);
      let fileSize;
      (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";

        let progressHTML = `<li class="row">
                              <i class="fa fa-file-alt"></i>
                              <div class="x-content">
                                  <div class="x-details">
                                      <span class="name">${name} • Uploading</span>
                                      <span class="percent">${fileLoaded}%</span>
                                  </div>
                                  <div class="progress-bar">
                                      <div class="progress" style="width: ${fileLoaded}%"></div>
                                  </div>
                              </div>
                          </li>`;
        ProgressArea.innerHTML = progressHTML;
      	if(loaded == total){
          let uploadedHTML = `<li class="row">
                              <i class="fa fa-file-alt"></i>
                              <div class="x-content">
                                  <div class="x-details">
                                      <span class="name">${name} • Uploaded</span>
                                  </div>
                              </div>
                              <i class="fa fa-check" aria-hidden="true"></i>
                          </li>`;
          UploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);

        }

    });
    let formData = new FormData(form);
    xhr.send(formData);

}

