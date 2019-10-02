let socket = io();

fetch("/restaurants")
    .then(r => r.json())
    .then(reuslt => console.log(reuslt))


