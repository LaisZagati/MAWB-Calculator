Overview

I built this MAWB (Master Air Waybill) Storage Charge Calculator to streamline the calculation of storage and handling fees based on specific criteria like weight, handling agent, and additional services. This project focuses on providing an intuitive, user-friendly interface that minimizes error and speeds up charge calculations.

How I Built It

HTML Structure:

I structured the calculator form using semantic HTML, with organized form groups for each input field. The form includes fields for weight, ground handling agent, and additional optional services such as cargo handling and ULD (Unit Load Device) handling.
Additional fields for days and ULDs appear conditionally based on user selections, creating a cleaner and less cluttered form.
Responsive and Accessible Design:

With the <meta> viewport tag and a simple, organized layout, the calculator is fully responsive and adjusts well on both desktop and mobile screens.
Labels and input placeholders guide the user, enhancing accessibility and usability.

Styling:

I customized the look and feel with a style.css file, keeping the layout clean and professional. Each form element is styled for clarity, with a distinct heading, labels, and button.
JavaScript for Dynamic Calculations:

I used JavaScript (via script.js) to calculate charges dynamically based on form inputs, updating the total charge immediately after form submission.
The script also toggles visibility for extra fields (such as the number of ULDs and extra days) when required, enhancing user experience by keeping the form streamlined.
Form Validation:

Basic validation ensures that required fields are completed, guiding users through the process and preventing errors in calculations.
This project was a great way to practice JavaScript for dynamic form handling and calculations, while applying responsive design techniques to enhance user experience.
