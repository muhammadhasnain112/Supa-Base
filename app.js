const supabaseUrl = 'https://ipoviueuhflhqjemgfkw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwb3ZpdWV1aGZsaHFqZW1nZmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc5NzEsImV4cCI6MjA2ODUxMzk3MX0.ACNfp4MRa7-r1YYmu04VDltBo5UudrKWWw2NyDPBrk0'
const supa = supabase.createClient(supabaseUrl, supabaseKey)
// let aemail = 'muhammadhasnain1213@sa'
// let Name = aemail.split('@')[0]
// console.log(Name);


token();
async function token() {
    const { data, error } = await supa.auth.getSession();
    if (data.session) {
        window.location.href = `dashboard.html`;
    }
}


let cemail = document.getElementById('c-email')
let cpassword = document.getElementById('c-pass')

async function signUp() {
    document.getElementById("loader").style.display = "flex";
    const { data, error } = await supa.auth.signUp({
        email: cemail.value, password: cpassword.value
    })
    document.getElementById("loader").style.display = "none";

    if (error) {
        alert(error.message)
    } else {
        alert('Please Verify Email')
        window.location.href = `index.html`
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
        // console.log('data', data.user);
        alert('Sucessfuly Login')
        // alert('Sucessfuly Login')
        // alert('Sucessfuly Login')
        // alert('Sucessfuly Login')
        // window.location.href = `dashboard.html`

    }
}




let flag = true
function visiblePass() {
    // flag = true
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
