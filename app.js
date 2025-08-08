const supabaseUrl = 'https://ipoviueuhflhqjemgfkw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwb3ZpdWV1aGZsaHFqZW1nZmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc5NzEsImV4cCI6MjA2ODUxMzk3MX0.ACNfp4MRa7-r1YYmu04VDltBo5UudrKWWw2NyDPBrk0'
const supa = supabase.createClient(supabaseUrl, supabaseKey)



let cemail = document.getElementById('c-email')
let cpassword = document.getElementById('c-pass')
let cname = document.getElementById('c-name')
let cImage = document.getElementById('c-img')

async function signUp() {
    document.getElementById("loader").style.display = "flex";
    const { data: signupdata, error } = await supa.auth.signUp({
        email: cemail.value, password: cpassword.value,
        options: {
            data: {
                display_name: cname.value,
            }
        }
    })
    document.getElementById("loader").style.display = "none";
    if (error) {
        alert(error.message)
    } else {
        const { error: abc } = await supa
            .from('userInfo')
            .insert({ email: cemail.value, name: cname.value })
        const { data, error } = await supa
            .from('userInfo')
            .select('userid')
            .eq('email', cemail.value)
        if (error) {
            console.log(error.message);

        }
        console.log(data[0].userid);
        let Image = data[0].userid

        const file = cImage.files[0];
        if (!file) {
            alert('Please select a file');
            return;
        }
        const fileExt = file.name.split('.').pop(); // avif, jpg etc.
        const fileName = `Login-User-Image/${Image}.${fileExt}`;
        const { data: userImage, error: userError } = await supa.storage
            .from('logedinprofile')
            .upload(fileName, file, {
            });
        const { data: publicurl } = supa
            .storage
            .from('logedinprofile')
            .getPublicUrl(fileName)
        console.log(publicurl.publicUrl);

        const { error: update } = await supa
            .from('userInfo')
            .update({ imgurl: publicurl.publicUrl })
            .eq('email', cemail.value)
        if (userError) {
            console.error('Upload error:', userError.message);
            alert('Upload failed: ' + userError.message);
        } else {
            console.log('Upload success:', userImage);
            alert('Image uploaded successfully!');
            alert('Please Verify Email')
            window.location.href = `index.html`
        }
    }
}









let email = document.getElementById('email')
let password = document.getElementById('pass')
async function login() {
    document.getElementById("loader").style.display = "flex";
    const { data, error } = await supa.auth.signInWithPassword({
        email: email.value, password: password.value
    })
    document.getElementById("loader").style.display = "none";
    if (error) {
        alert(error.message)
    } else {
        alert('Sucessfuly Login')
        window.location.href = `dashboard.html`
    }
}





async function google() {
    document.getElementById("loader").style.display = "flex";
    const { data, error } = await supa.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'https://supabase.netlify.app/dashboard.html'
        }
    })
    document.getElementById("loader").style.display = "none";
    if (error) {
        alert(error.message)
    } else {
        alert('Sucessfuly Login')
    }
}

// async function facebook() {
//     const { data, error } = await supa.auth.signInWithOAuth({
//         provider: 'facebook',
//         options: {
//             // redirectTo: 'https://supabase.netlify.app/dashboard.html'
//             redirectTo: 'http://127.0.0.1:5501/dashboard.html'
//         }
//     })
//     // localStorage.setItem('info',JSON.stringify(data))
//     if (error) {
//         alert(error.message)
//     }
//     // } else {
//     //     alert('Sucessfuly Login')
//     // }
// }




let flag = true
function visiblePass() {
    let visible = document.getElementById('visible')
    if (flag) {
        visible.src = `img/visible.png`
        password.type = `text`
        flag = false
    } else {
        visible.src = `img/invisible.png`
        password.type = `password`
        flag = true
    }
}



let flag1 = true
function SignUpvisiblePass() {
    let visible = document.getElementById('visible')
    if (flag1) {
        visible.src = `img/visible.png`
        cpassword.type = `text`
        flag1 = false
    } else {
        visible.src = `img/invisible.png`
        cpassword.type = `password`
        flag1 = true
    } 1
}
