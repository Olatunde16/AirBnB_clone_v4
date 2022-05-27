#!/usr/bin/node
/*
JavaScript script
*/
const $ = window.$;
document.addEventListener('DOMContentLoaded', (event) => {
    $('input:checkbox').change(function() {
        alert("hello")
    });
});
