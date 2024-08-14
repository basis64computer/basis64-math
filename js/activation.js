$(window).load(async function() {
                let activated = await isUserActivated();
                let trial = getCookie("trial");

                console.log("user2: " + activated);
                if (!activated && trial) {
                    $("#userNotActivatedDialogModal").modal("show");
                    document.getElementById('trialTitle').innerHTML = "Kamu masih dapat mengakses halaman ini karena kamu masih memiliki " + trial + " trial gratis. Kamu tidak dapat mengakses halaman ini jika kamu tidak memiliki trial gratis, dan kamu harus mengaktivasi akun kamu untuk mengakses halaman ini.";
                    setCookie("trial", trial-1);
                } else if (!activated) {
                    $("#userNotActivatedDialogModal").modal("show");
                    $('#userNotActivatedDialogModal').on('hidden.bs.modal', function () {
                      document.location.replace("index.html");
                    });
                }
            });
