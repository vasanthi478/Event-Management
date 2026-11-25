
/* ================= USER SIGNUP ================= */

function signupUser(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("eventHubUsers") || "[]");

    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        alert("This email is already registered. Please login.");
        return;
    }

    users.push({
        name,
        email,
        phone,
        password
    });

    localStorage.setItem("eventHubUsers", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "login.html";
}


/* ================= LOGIN ================= */

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("eventHubUsers") || "[]");

    const user = users.find(
        user =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
    );

    if (user) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", user.email);

        alert("Login successful!");

        window.location.href = "index.html";
    } else {
        alert("Invalid email or password!");
    }
}


/* ================= CHECK LOGIN ================= */

function checkLogin() {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
        return;
    }

    const email = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("eventHubUsers") || "[]");

    const user = users.find(user => user.email === email);

    const welcome = document.getElementById("welcomeUser");

    if (welcome && user) {
        welcome.innerText = "Hi, " + user.name;
    }
}


/* ================= LOGOUT ================= */

function logoutUser() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    window.location.href = "login.html";
}


/* ================= GO TO EVENTS ================= */

function goToEvents() {
    document.getElementById("events").scrollIntoView({
        behavior: "smooth"
    });
}


/* ================= EVENT DATA ================= */

let eventData = {
    name: "",
    date: "",
    location: "",
    price: 0
};


/* ================= SELECT EVENT ================= */

function selectEvent(name, date, location, price) {
    eventData.name = name;
    eventData.date = date;
    eventData.location = location;
    eventData.price = price;

    document.getElementById("selectedEvent").value = name;
    document.getElementById("selectedDate").value = date;
    document.getElementById("selectedLocation").value = location;

    document.getElementById("ticketCount").value = 1;
    document.getElementById("totalAmount").innerText = price;

    document.getElementById("registration").scrollIntoView({
        behavior: "smooth"
    });
}


/* ================= CALCULATE TOTAL ================= */

function calculateTotal() {
    const tickets = Number(document.getElementById("ticketCount").value);

    if (tickets < 1 || tickets > 10) {
        alert("You can select between 1 and 10 tickets.");
        document.getElementById("ticketCount").value = 1;
        calculateTotal();
        return;
    }

    const total = eventData.price * tickets;

    document.getElementById("totalAmount").innerText = total;
}


/* ================= REGISTER EVENT ================= */

function registerEvent(event) {
    event.preventDefault();

    if (eventData.name === "") {
        alert("Please select an event first!");
        return;
    }

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const phone = document.getElementById("userPhone").value.trim();

    const tickets = Number(document.getElementById("ticketCount").value);
    const total = eventData.price * tickets;

    if (tickets < 1 || tickets > 10) {
        alert("Please select between 1 and 10 tickets.");
        return;
    }

    const registrationId =
        "EVT" + Math.floor(100000 + Math.random() * 900000);

    document.getElementById("registrationId").innerText = registrationId;
    document.getElementById("finalName").innerText = name;
    document.getElementById("finalEmail").innerText = email;
    document.getElementById("finalPhone").innerText = phone;
    document.getElementById("finalEvent").innerText = eventData.name;
    document.getElementById("finalDate").innerText = eventData.date;
    document.getElementById("finalLocation").innerText = eventData.location;
    document.getElementById("finalTickets").innerText = tickets;
    document.getElementById("finalAmount").innerText = total;

    const confirmation = document.getElementById("confirmation");
    confirmation.style.display = "flex";

    confirmation.scrollIntoView({
        behavior: "smooth"
    });

    alert("Event registered successfully!");
}


/* ================= PAYMENT DEMO ================= */

function paymentUser(event) {
    event.preventDefault();

    const consumerId = document.getElementById("consumerId").value.trim();
    const customerName = document.getElementById("customerName").value.trim();
    const amount = Number(document.getElementById("amount").value);

    if (!consumerId || !customerName || amount <= 0) {
        alert("Please enter valid payment details.");
        return;
    }

    alert(
        "Payment form submitted successfully!\n" +
        "Customer: " + customerName +
        "\nAmount: ₹" + amount +
        "\n\nDemo only. No actual payment was processed."
    );

    event.target.reset();
}


/* ================= CONTACT ================= */

function sendMessage(event) {
    event.preventDefault();

    alert("Thank you! Your message has been received.");

    event.target.reset();
}


/* ================= RUN LOGIN CHECK ================= */

if (window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/")) {

    checkLogin();
}
