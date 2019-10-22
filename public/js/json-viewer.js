var jsonObj = {};
var jsonViewer = new JSONViewer();
document.querySelector("#json").appendChild(jsonViewer.getContainer());

var textarea = document.querySelector("textarea");
textarea.value = JSON.stringify([
  {
    "id": "001",
    "user": "megan_F0x",
    "profile":
      {    
          "nama":"Megan Fox",
          "alamat":"Jl Nin aja dulu",
          "telepon":628123456789,
          "email":"duh@malu.co",
          "social media": 
            {
              "facebook":"megan fox",
              "twitter":"@megan_F0x"
            }
      },
    "pengalaman":[
            {
              "perusahaan":"PT Transformer",
              "daritahun": 2010,
              "sampaitahun": 2011,
              "posisi": "junior developer",
              "promosi karir": null,
              "listpekerjaan": [
                {
                  "jenis": "project base",
                  "deskripsi": "front end developer",
                  "lamapekerjaan": "6 bulan",
                  "deadline bonus": true,
                  "rekan kerja": [
                    {
                      "nama": "shia lebaouf",
                      "posisi": "lead developer",
                      "contact": 
                        {
                          "telepon" : 628890066631,
                          "email": "shia@lebaouf.com",
                          "socialmedia": {
                            "facebook": "shia lebaouf",
                            "twitter": "@shia lebaouf"
                          }
                        }
                    },
                    {
                      "nama": "josh duhamel",
                      "posisi": "senior developer",
                      "contact": 
                        {
                          "telepon" : 62345667687788,
                          "email": "josh@duhamel.com",
                          "socialmedia": {
                            "facebook": "josh duhamel",
                            "twitter": "@josh duhamel"
                          }
                        }
                    }]
                },
                {
                  "jenis": "project base",
                  "jabatan": "web developer",
                  "lamapekerjaan": "3 bulan",
                  "deadline bonus": false,
                  "rekan kerja": [
                    {
                      "nama": "stephen amell",
                      "posisi": "lead developer",
                      "contact": 
                        {
                          "telepon" : 629485765690,
                          "email": "stephen@amell.com",
                          "socialmedia": {
                            "facebook": "stephen amell",
                            "twitter": "@stephen_amell"
                          }
                        }
                    },
                    {
                      "nama": "tyler perry",
                      "posisi": "senior developer",
                      "contact": 
                        {
                          "telepon" : 62948453666,
                          "email": "tyler@perry.com",
                          "socialmedia": {
                            "facebook": "tyler perry",
                            "twitter": "@tyler perry"
                          }
                        }
                    }]
                }]
            }]
  }
]);

// textarea value to JSON object
var setJSON = function () {
  try {
    var value = textarea.value;
    jsonObj = JSON.parse(value);
  }
  catch (err) {
    alert(err);
  }
};

// load default value
setJSON();

var loadJsonBtn = document.querySelector("button.load-json");
var collapseBtn = document.querySelector("button.collapse");
var expandBtn = document.querySelector("button.expand");
var resetBtn = document.querySelector("button.reset");

loadJsonBtn.addEventListener("click", function () {
  setJSON();
  jsonViewer.showJSON(jsonObj);
});

collapseBtn.addEventListener("click", function () {
  jsonViewer.showJSON(jsonObj, null, 1);
});

expandBtn.addEventListener("click", function () {
  setJSON();
  jsonViewer.showJSON(jsonObj);
});

resetBtn.addEventListener("click", function () {
  document.getElementById("msg").value = "";
});

