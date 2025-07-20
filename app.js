const supabaseUrl = 'https://ipoviueuhflhqjemgfkw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwb3ZpdWV1aGZsaHFqZW1nZmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc5NzEsImV4cCI6MjA2ODUxMzk3MX0.ACNfp4MRa7-r1YYmu04VDltBo5UudrKWWw2NyDPBrk0'
const supa = supabase.createClient(supabaseUrl, supabaseKey)



async function signUp() {
    let email = document.getElementById('c-email').value
    let password = document.getElementById('c-pass').value
    const { data, error } = await supa.auth.signUp({
        email, password
    })
    if (error) {
        alert(error.massage)
    } else {
        alert('Please Verify Email')
        window.Location.href = 'login.html'
    }
}


async function login() {
    let email = document.getElementById('email').value
    let password = document.getElementById('pass').value
    const { data, error } = await supa.auth.signInWithPassword({
        email, password
    })
    if (error) {
        alert(error.massage)
    } else {
        alert('Sucessfuly Login')
        window.location.href = `dashboard.html`
    }
}
