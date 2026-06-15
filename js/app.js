function gel(id) {
  return (
    document.getElementById(id) || {
      addEventListener: function (e, fn) {},
      classList: {
        add: function () {},
        remove: function () {},
        toggle: function () {},
        contains: function () {
          return false;
        },
      },
      style: {},
    }
  );
}
function on(id, ev, fn) {
  var el = document.getElementById(id);
  if (el) el.addEventListener(ev, fn);
}
function doLogin() {
  var u = document.getElementById("lgU").value.trim();
  var p = document.getElementById("lgP").value.trim();
  if (u === "test" && p === "test") {
    var frm = document.getElementById("lgForm");
    var ldr = document.getElementById("lgLoader");
    if (frm) frm.style.display = "none";
    if (ldr) ldr.style.display = "flex";
    setTimeout(function () {
      if (ldr) ldr.style.display = "none";
      if (frm) frm.style.display = "block";
      show("pgJobs");
      try {
        renderJobs();
      } catch (e) {
        console.error("renderJobs:", e);
      }
    }, 800);
  } else {
    var e = document.getElementById("lgE");
    if (e) e.textContent = "Neteisingas vardas arba slaptažodis";
  }
}

window.onerror = function (msg, src, line) {
  var e = document.getElementById("lgE");
  if (e) e.textContent = "Klaida: " + msg + " (" + line + ")";
  return false;
};

var IMGS = {
  mall: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MDAnIGhlaWdodD0nMTgwJz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz48c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjMUIzRjZCJy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjMEExRjM4Jy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzQwMCcgaGVpZ2h0PScxODAnIGZpbGw9J3VybCgjZyknLz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzE4MCcgZmlsbD0ncmdiYSgwLDAsMCwwLjE1KScvPjx0ZXh0IHg9JzIwMCcgeT0nODInIHRleHQtYW5jaG9yPSdtaWRkbGUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIGZvbnQtc2l6ZT0nNTYnIGZvbnQtZmFtaWx5PSdBcHBsZSBDb2xvciBFbW9qaSxTZWdvZSBVSSBFbW9qaSxzZXJpZic+8J+PrDwvdGV4dD48dGV4dCB4PScyMDAnIHk9JzE1MicgdGV4dC1hbmNob3I9J21pZGRsZScgZm9udC1zaXplPScxMycgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwwLjUpJyBmb250LWZhbWlseT0nc3lzdGVtLXVpLHNhbnMtc2VyaWYnIGZvbnQtd2VpZ2h0PSc1MDAnPlByZWt5Ym9zIGNlbnRyYXM8L3RleHQ+PC9zdmc+",
  building:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MDAnIGhlaWdodD0nMTgwJz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz48c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjMUE0MDMwJy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjMEEyMDE4Jy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzQwMCcgaGVpZ2h0PScxODAnIGZpbGw9J3VybCgjZyknLz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzE4MCcgZmlsbD0ncmdiYSgwLDAsMCwwLjE1KScvPjx0ZXh0IHg9JzIwMCcgeT0nODInIHRleHQtYW5jaG9yPSdtaWRkbGUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIGZvbnQtc2l6ZT0nNTYnIGZvbnQtZmFtaWx5PSdBcHBsZSBDb2xvciBFbW9qaSxTZWdvZSBVSSBFbW9qaSxzZXJpZic+8J+PojwvdGV4dD48dGV4dCB4PScyMDAnIHk9JzE1MicgdGV4dC1hbmNob3I9J21pZGRsZScgZm9udC1zaXplPScxMycgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwwLjUpJyBmb250LWZhbWlseT0nc3lzdGVtLXVpLHNhbnMtc2VyaWYnIGZvbnQtd2VpZ2h0PSc1MDAnPlZlcnNsbyBjZW50cmFzPC90ZXh0Pjwvc3ZnPg==",
  school:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MDAnIGhlaWdodD0nMTgwJz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz48c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjMUEyODQ1Jy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjMEExNTI1Jy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzQwMCcgaGVpZ2h0PScxODAnIGZpbGw9J3VybCgjZyknLz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzE4MCcgZmlsbD0ncmdiYSgwLDAsMCwwLjE1KScvPjx0ZXh0IHg9JzIwMCcgeT0nODInIHRleHQtYW5jaG9yPSdtaWRkbGUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIGZvbnQtc2l6ZT0nNTYnIGZvbnQtZmFtaWx5PSdBcHBsZSBDb2xvciBFbW9qaSxTZWdvZSBVSSBFbW9qaSxzZXJpZic+8J+PqzwvdGV4dD48dGV4dCB4PScyMDAnIHk9JzE1MicgdGV4dC1hbmNob3I9J21pZGRsZScgZm9udC1zaXplPScxMycgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwwLjUpJyBmb250LWZhbWlseT0nc3lzdGVtLXVpLHNhbnMtc2VyaWYnIGZvbnQtd2VpZ2h0PSc1MDAnPkRhcsW+ZWxpczwvdGV4dD48L3N2Zz4=",
  house:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MDAnIGhlaWdodD0nMTgwJz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz48c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjM0QyMjEwJy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjMjAxMjA4Jy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzQwMCcgaGVpZ2h0PScxODAnIGZpbGw9J3VybCgjZyknLz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzE4MCcgZmlsbD0ncmdiYSgwLDAsMCwwLjE1KScvPjx0ZXh0IHg9JzIwMCcgeT0nODInIHRleHQtYW5jaG9yPSdtaWRkbGUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIGZvbnQtc2l6ZT0nNTYnIGZvbnQtZmFtaWx5PSdBcHBsZSBDb2xvciBFbW9qaSxTZWdvZSBVSSBFbW9qaSxzZXJpZic+8J+PoTwvdGV4dD48dGV4dCB4PScyMDAnIHk9JzE1MicgdGV4dC1hbmNob3I9J21pZGRsZScgZm9udC1zaXplPScxMycgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwwLjUpJyBmb250LWZhbWlseT0nc3lzdGVtLXVpLHNhbnMtc2VyaWYnIGZvbnQtd2VpZ2h0PSc1MDAnPk5hbWFzPC90ZXh0Pjwvc3ZnPg==",
  warehouse:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MDAnIGhlaWdodD0nMTgwJz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz48c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjM0QxNTE1Jy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjMjAwQTBBJy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzQwMCcgaGVpZ2h0PScxODAnIGZpbGw9J3VybCgjZyknLz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzE4MCcgZmlsbD0ncmdiYSgwLDAsMCwwLjE1KScvPjx0ZXh0IHg9JzIwMCcgeT0nODInIHRleHQtYW5jaG9yPSdtaWRkbGUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIGZvbnQtc2l6ZT0nNTYnIGZvbnQtZmFtaWx5PSdBcHBsZSBDb2xvciBFbW9qaSxTZWdvZSBVSSBFbW9qaSxzZXJpZic+8J+PrTwvdGV4dD48dGV4dCB4PScyMDAnIHk9JzE1MicgdGV4dC1hbmNob3I9J21pZGRsZScgZm9udC1zaXplPScxMycgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwwLjUpJyBmb250LWZhbWlseT0nc3lzdGVtLXVpLHNhbnMtc2VyaWYnIGZvbnQtd2VpZ2h0PSc1MDAnPlNhbmTEl2xpczwvdGV4dD48L3N2Zz4=",
  office:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MDAnIGhlaWdodD0nMTgwJz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz48c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjMUEyODQ1Jy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjMEExNTI1Jy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzQwMCcgaGVpZ2h0PScxODAnIGZpbGw9J3VybCgjZyknLz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzE4MCcgZmlsbD0ncmdiYSgwLDAsMCwwLjE1KScvPjx0ZXh0IHg9JzIwMCcgeT0nODInIHRleHQtYW5jaG9yPSdtaWRkbGUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIGZvbnQtc2l6ZT0nNTYnIGZvbnQtZmFtaWx5PSdBcHBsZSBDb2xvciBFbW9qaSxTZWdvZSBVSSBFbW9qaSxzZXJpZic+8J+PlzwvdGV4dD48dGV4dCB4PScyMDAnIHk9JzE1MicgdGV4dC1hbmNob3I9J21pZGRsZScgZm9udC1zaXplPScxMycgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwwLjUpJyBmb250LWZhbWlseT0nc3lzdGVtLXVpLHNhbnMtc2VyaWYnIGZvbnQtd2VpZ2h0PSc1MDAnPkJpdXJhczwvdGV4dD48L3N2Zz4=",
  apartment:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MDAnIGhlaWdodD0nMTgwJz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz48c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjMjIyMjRBJy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjMTAxMDI4Jy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzQwMCcgaGVpZ2h0PScxODAnIGZpbGw9J3VybCgjZyknLz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzE4MCcgZmlsbD0ncmdiYSgwLDAsMCwwLjE1KScvPjx0ZXh0IHg9JzIwMCcgeT0nODInIHRleHQtYW5jaG9yPSdtaWRkbGUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIGZvbnQtc2l6ZT0nNTYnIGZvbnQtZmFtaWx5PSdBcHBsZSBDb2xvciBFbW9qaSxTZWdvZSBVSSBFbW9qaSxzZXJpZic+8J+PmDwvdGV4dD48dGV4dCB4PScyMDAnIHk9JzE1MicgdGV4dC1hbmNob3I9J21pZGRsZScgZm9udC1zaXplPScxMycgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwwLjUpJyBmb250LWZhbWlseT0nc3lzdGVtLXVpLHNhbnMtc2VyaWYnIGZvbnQtd2VpZ2h0PSc1MDAnPkRhdWdpYWJ1dGlzPC90ZXh0Pjwvc3ZnPg==",
};
var JOBS = [
  {
    id: 2457,
    num: "V260522-1",
    name: "Amber Grid AB",
    client: "Amber Grid AB",
    obj: "Vilniaus administraciniai ir gamybiniai pastatai",
    addr: "Laisvės pr. 10, Vilnius",
    phone: "+370 5 236 1111",
    contactName: "Tomas Kazlauskas",
    contactRole: "Vyriausiasis inžinierius",
    desc: "Pavojaus mygtukų įrengimas dispečerinėje.",
    date: "2026-05-22",
    st: "new",
    type: "apt",
    timers: { prep: 0, trav: 0, work: 0 },
    running: null,
    rs: null,
    notes: "",
  },
  {
    id: 2458,
    num: "V260522-2",
    name: "SEB bankas AB",
    client: "SEB bankas AB",
    obj: "Fabijoniškių skyrius",
    addr: "Fabijoniškių g. 3, Vilnius",
    phone: "+370 5 268 2800",
    contactName: "Rasa Paulauskienė",
    contactRole: "Skyriaus vadovė",
    desc: "Dingo kamerų vaizdas Fabijoniškių savitarnos zonos 03:35 valandą ir neatsistatė.",
    date: "2026-05-22",
    st: "work",
    type: "ged",
    timers: { prep: 540, trav: 1260, work: 3240 },
    running: null,
    rs: null,
    notes: "",
  },
  {
    id: 2459,
    num: "V260522-3",
    name: "Nutz GmbH",
    client: "Nutz GmbH",
    obj: "Unity Vilnius",
    addr: "Gynėjų g. 14, Vilnius",
    phone: "+370 5 210 2700",
    contactName: "Erik Müller",
    contactRole: "Facility Manager",
    desc: "Raktų dėžutės montavimas, kabelio atvedimas iki jos. Raktų cilindrų keitimas.",
    date: "2026-05-21",
    st: "stop",
    type: "pap",
    timers: { prep: 300, trav: 900, work: 1800 },
    running: null,
    rs: null,
    notes: "",
  },
  {
    id: 2460,
    num: "V260521-1",
    name: 'UAB "Elektrum Lietuva"',
    client: 'UAB "Elektrum Lietuva"',
    obj: "Šalčininkai 65MW",
    addr: "Šalčininkai, Šalčininkų r.",
    phone: "+370 5 255 3000",
    contactName: "Mindaugas Grigas",
    contactRole: "Projekto vadovas",
    desc: "Gaisro pajungimas prie Trikdžio. Optikos 5 bokšto atstatymas. Baigiamieji darbai.",
    date: "2026-05-21",
    st: "new",
    type: "apt",
    timers: { prep: 0, trav: 0, work: 0 },
    running: null,
    rs: null,
    notes: "",
  },
  {
    id: 2461,
    num: "V260521-2",
    name: "Lietuvos oro uostai",
    client: "Lietuvos oro uostai",
    obj: "Oro Uosto perimetras",
    addr: "Rodūnios kelias 10A, Vilnius",
    phone: "+370 5 273 9300",
    contactName: "Algirdas Tamošaitis",
    contactRole: "Saugos vadovas",
    desc: "Vaizdo stebėjimo sistemos aptarnavimas, kamerų valymas, patikra.",
    date: "2026-05-20",
    st: "new",
    type: "apt",
    timers: { prep: 0, trav: 0, work: 0 },
    running: null,
    rs: null,
    notes: "",
  },
  {
    id: 2462,
    num: "V260520-1",
    name: "Ignitis gamyba AB",
    client: "Ignitis gamyba AB",
    obj: "Elektrėnų kompleksas",
    addr: "Elektrėnai, Elektrėnų sav.",
    phone: "+370 528 58001",
    contactName: "Darius Petrauskas",
    contactRole: "Techninis direktorius",
    desc: "Belaidžio ryšio problemos.",
    date: "2026-05-20",
    st: "stop",
    type: "ged",
    timers: { prep: 600, trav: 2400, work: 5400 },
    running: null,
    rs: null,
    notes: "",
  },
  {
    id: 2463,
    num: "V260519-1",
    name: "VSGA UAB Casino Tornado (Admiral)",
    client: "VSGA UAB Casino Tornado (Admiral)",
    obj: "Antakalnis",
    addr: "Antakalnio g. 124, Vilnius",
    phone: "+370 5 264 9800",
    contactName: "Viktorija Černiauskienė",
    contactRole: "Objekto administratorė",
    desc: "Nuotolinė visų objektų techninė planinė apžiūra. Vidaus vaizdo stebėjimo kamerų vaizdo kokybės patikra.",
    date: "2026-05-19",
    st: "new",
    type: "apt",
    timers: { prep: 0, trav: 0, work: 0 },
    running: null,
    rs: null,
    notes: "",
  },
];
var MSGS = [
  {
    id: 6,
    type: "warn",
    title: "Artėja TA pabaiga – MZB659",
    text: "Automobilio MZB659 techninės apžiūros galiojimas baigiasi 2026-05-31. Pasirūpinkite atnaujinimu laiku.",
    type: "warn",
    time: "Prieš 10 min.",
    read: false,
  },
  {
    id: 7,
    type: "warn",
    title: "Ecofleet mėnesio ataskaita",
    text: "Prašome užpildyti Ecofleet mėnesio ataskaitą. Terminas – šio mėnesio pabaiga.",
    time: "Prieš 1 val.",
    read: false,
  },
  {
    id: 1,
    type: "new",
    title: "Sukurtas naujas darbas",
    text: "Priskirtas darbas „Prekybos centras Nordika“ – gedimo šalinimas.",
    time: "Prieš 30 min.",
    read: false,
  },
  {
    id: 2,
    type: "upd",
    title: "Atnaujintas darbas",
    text: "Darbas „Versionlo centras Green Hall“ – pakeista būsena į Dirbamas.",
    time: "Prieš 1 val.",
    read: false,
  },
  {
    id: 3,
    type: "del",
    title: "Ištrintas darbas",
    text: "Vadovas ištrinė darbą „Gamyklos šviestuvų montavimas“.",
    time: "Vakar 14:30",
    read: true,
  },
  {
    id: 4,
    type: "new",
    title: "Sukurtas naujas darbas",
    text: "Priskirtas garantinis darbas „Individualus namas“.",
    time: "Vakar 09:00",
    read: true,
  },
  {
    id: 5,
    type: "upd",
    title: "Atnaujintas darbas",
    text: "Sandėlio patalpos – darbas sustabdytas, laukiama dalies.",
    time: "2 d. prieš tai",
    read: true,
  },
];
var OBJECTS = [
  {
    id: 1,
    name: "Amber Grid AB",
    addr: "Ozo g. 25, Vilnius",
    img: "mall",
    systems: "Lenel, Avigilon, Inim",
    contacts: [
      {
        name: "Tomas Kazlauskas",
        role: "Techninis vadovas",
        phone: "+370 600 11111",
      },
      {
        name: "Laura Petrauskienė",
        role: "Administratoerė",
        phone: "+370 600 11122",
      },
    ],
    creds: {
      nvr: "admin / nord2024!",
      ip: "192.168.1.100",
      alarm_inst: "1234",
      alarm_master: "9876",
    },
    drawings: ["Aukštu_planas_1.pdf", "Kabeliu_schema.pdf", "CCTV_layout.pdf"],
    hist: [
      {
        who: "Marius L.",
        when: "2026-05-15",
        what: "Pakeista pagrindinio įėjimo durų sklendė (atvirkštinė)",
      },
      {
        who: "Jonas S.",
        when: "2026-03-10",
        what: "Pakeistas POE injector",
      },
    ],
  },
  {
    id: 2,
    name: "SEB Bankas AB",
    addr: "K. Donelaičio g. 10, Vilnius",
    img: "building",
    systems: "Avigilon, Lenel, Galaxy, Inim",
    contacts: [
      {
        name: "Rimas Jonaitis",
        role: "Objekto vadovas",
        phone: "+370 600 22222",
      },
    ],
    creds: {
      nvr: "admin / gh@secure23",
      ip: "192.168.2.50",
      alarm_inst: "5678",
      alarm_master: "0000",
    },
    drawings: ["Green_Hall_planas.pdf", "Kabeliavimo_schema.pdf"],
    hist: [
      {
        who: "Marius L.",
        when: "2026-05-22",
        what: "24 naujų kamerų įrengimas",
      },
      {
        who: "Petras K.",
        when: "2026-03-10",
        what: "Prieigos kortelių programavimas",
      },
    ],
  },
  {
    id: 3,
    name: "Lietuvos oro uostai",
    addr: "Pramonių g. 4, Vilnius",
    img: "warehouse",
    systems: "Bentel, DSC, Integriti, Bosch",
    contacts: [
      {
        name: "Algis Butkus",
        role: "Inžinierius",
        phone: "+370 600 33333",
      },
    ],
    creds: {
      nvr: "admin / sp2025",
      ip: "192.168.3.10",
      alarm_inst: "1111",
      alarm_master: "2222",
    },
    drawings: ["Sandėlio_planas.pdf"],
    hist: [
      {
        who: "Marius L.",
        when: "2026-05-23",
        what: "Perkrauta gaisro centralė",
      },
      { who: "Petras K.", when: "2026-01-15", what: "Kameros firmware update" },
    ],
  },
];
var INSTR_FOLDERS = [
  {
    id: "pk",
    name: "Praėjimo kontrolė",
    color: "rgba(26,86,160,0.12)",
    darkColor: "rgba(59,130,246,0.15)",
    files: [
      { n: "DSC_Praejimo_kontrole_v2.pdf", s: "3.2 MB" },
      { n: "Galaxy_Dimension_instrukcija.pdf", s: "8.7 MB" },
      { n: "Paxton_Net2_vadovas.pdf", s: "5.1 MB" },
    ],
  },
  {
    id: "vs",
    name: "Vaizdo stebėjimo sistema",
    color: "rgba(22,163,74,0.12)",
    darkColor: "rgba(22,163,74,0.15)",
    files: [
      { n: "Hikvision_NVR_setup.pdf", s: "12.4 MB" },
      { n: "Dahua_IP_kameros_vadovas.pdf", s: "6.8 MB" },
      { n: "PTZ_kameros_valdymas.pdf", s: "4.3 MB" },
    ],
  },
  {
    id: "ap",
    name: "Apsaugos sistema",
    color: "rgba(217,119,6,0.12)",
    darkColor: "rgba(217,119,6,0.15)",
    files: [
      { n: "DSC_PowerSeries_Neo.pdf", s: "9.1 MB" },
      { n: "Paradox_SP65_instrukcija.pdf", s: "7.5 MB" },
      { n: "Ajax_Hub_konfiguracija.pdf", s: "2.9 MB" },
    ],
  },
  {
    id: "ga",
    name: "Gaisro apsaugos sistema",
    color: "rgba(220,38,38,0.12)",
    darkColor: "rgba(220,38,38,0.15)",
    files: [
      { n: "Notifier_AM2020_instrukcija.pdf", s: "11.2 MB" },
      { n: "Gaisro_jutikliu_montavimas.pdf", s: "4.6 MB" },
    ],
  },
  {
    id: "kt",
    name: "Kita",
    color: "rgba(100,100,100,0.12)",
    darkColor: "rgba(148,163,184,0.12)",
    files: [
      { n: "UPS_Eaton_instrukcija.pdf", s: "3.8 MB" },
      { n: "Structured_cabling.pdf", s: "6.2 MB" },
    ],
  },
];
// STATE
var cid = null,
  liveInt = null,
  isDark = false,
  filt = "all",
  calY = 2026,
  calM = 4,
  curObj = null,
  credVis = {},
  instrFolder = null;
// PAGE NAV - simple show/hide
var PAGES = [
  "pgLogin",
  "pgJobs",
  "pgDetail",
  "pgMsgs",
  "pgCal",
  "pgMore",
  "pgObjects",
  "pgObjDet",
  "pgInstr",
  "pgAtas",
  "pgDuty",
];
function show(id) {
  PAGES.forEach(function (p) {
    var el = document.getElementById(p);
    if (el) el.style.display = "none";
  });
  var t = document.getElementById(id);
  if (t) t.style.display = "flex";
  updateNav(id);
}

function updateNav(pgId) {
  var tab =
    pgId === "pgJobs" || pgId === "pgDetail"
      ? "jobs"
      : pgId === "pgMsgs"
        ? "msgs"
        : pgId === "pgCal"
          ? "cal"
          : "more";
  document.querySelectorAll(".nb").forEach(function (b) {
    b.classList.toggle("on", b.getAttribute("data-tab") === tab);
  });
}

// NAV BUTTONS
var NAV = [
  {
    tab: "jobs",
    lbl: "Darbai",
    svg: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="m9 12 2 2 4-4"/>',
  },
  {
    tab: "msgs",
    lbl: "Prane&#353;imai",
    svg: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  },
  {
    tab: "cal",
    lbl: "Kalendorius",
    svg: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  },
  {
    tab: "more",
    lbl: "Daugiau",
    svg: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  },
];
function navHTML(activeTab) {
  return NAV.map(function (n) {
    return (
      '<button class="nb' +
      (n.tab === activeTab ? " on" : "") +
      '" data-tab="' +
      n.tab +
      '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      n.svg +
      "</svg></button>"
    );
  }).join("");
}

["bn1", "bn2", "bn3", "bn4", "bn5", "bn6", "bn7", "bn8", "bn9"].forEach(
  function (id, i) {
    var tabs = [
      "jobs",
      "jobs",
      "msgs",
      "cal",
      "more",
      "more",
      "more",
      "more",
      "more",
    ];
    var el = document.getElementById(id);
    if (el) el.innerHTML = navHTML(tabs[i]);
  },
);
document.querySelectorAll(".nb").forEach(function (b) {
  b.addEventListener("click", function () {
    var tab = this.getAttribute("data-tab");
    if (tab === "jobs") {
      show("pgJobs");
      renderJobs();
    } else if (tab === "msgs") {
      show("pgMsgs");
      renderMsgs();
    } else if (tab === "cal") {
      show("pgCal");
      renderCal();
    } else if (tab === "more") {
      show("pgMore");
    }
  });
});
// HELPERS
function sv(path, size) {
  return (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="' +
    (size || 18) +
    '" height="' +
    (size || 18) +
    '">' +
    path +
    "</svg>"
  );
}
function ts(s) {
  var h = Math.floor(s / 3600),
    m = Math.floor((s % 3600) / 60),
    sc = s % 60;
  return [h, m, sc]
    .map(function (v) {
      return String(v).padStart(2, "0");
    })
    .join(":");
}
function lv(j, t) {
  var v = j.timers[t];
  if (j.running === t && j.rs) v += Math.floor((Date.now() - j.rs) / 1000);
  return ts(v);
}

var TI = {
  ged: {
    lbl: "Gedimas",
    cls: "tt-ged",
    bg: "rgba(22,163,74,0.15)",
    str: "#4ADE80",
  },
  apt: {
    lbl: "Aptarnavimas",
    cls: "tt-apt",
    bg: "rgba(26,86,160,0.15)",
    str: "#5B9BD5",
  },
  pap: {
    lbl: "Papildomi darbai",
    cls: "tt-pap",
    bg: "rgba(8,145,178,0.15)",
    str: "#22D3EE",
  },
  gar: {
    lbl: "Garantinis",
    cls: "tt-gar",
    bg: "rgba(220,38,38,0.15)",
    str: "#F87171",
  },
};
var SI = {
  new: { lbl: "Naujas", cls: "st-new" },
  work: { lbl: "Dirbamas", cls: "st-work" },
  stop: { lbl: "Sustabdytas", cls: "st-stop" },
};
var JP = {
  ged: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  apt: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  pap: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  gar: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
};
// LOGIN
on("lgBtn", "click", function () {
  var u = document.getElementById("lgU").value.trim();
  var p = document.getElementById("lgP").value.trim();
  if (u === "test" && p === "test") {
    // Show loader
    document.getElementById("lgForm").style.display = "none";
    document.getElementById("lgLoader").style.display = "flex";
    setTimeout(function () {
      document.getElementById("lgLoader").style.display = "none";
      document.getElementById("lgForm").style.display = "block";
      show("pgJobs");
      renderJobs();
    }, 1000);
  } else {
    document.getElementById("lgE").textContent =
      "Neteisingas vardas arba slaptažodis";
  }
});

on("pwToggle", "click", function () {
  var inp = document.getElementById("lgP");
  var ico = document.getElementById("eyeIcon");
  if (!inp || !ico) return;
  if (inp.type === "password") {
    inp.type = "text";
    ico.innerHTML =
      '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
  } else {
    inp.type = "password";
    ico.innerHTML =
      '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
});

on("lgP", "keydown", function (e) {
  if (e.key === "Enter") document.getElementById("lgBtn").click();
});
// LOGOUT
on("logoutBtn", "click", function () {
  var lm = document.getElementById("logoutModal");
  document.body.appendChild(lm);
  lm.style.display = "flex";
  lm.style.alignItems = "flex-end";
  lm.style.justifyContent = "center";
  lm.style.position = "fixed";
  lm.style.top = "0";
  lm.style.left = "0";
  lm.style.width = "100vw";
  lm.style.height = "100dvh";
  lm.style.background = "rgba(15,23,42,0.55)";
  lm.style.zIndex = "99999";
  lm.classList.add("open");
});
on("logoutConfirm", "click", function () {
  (function () {
    var _m = document.getElementById("logoutModal");
    if (_m) {
      _m.classList.remove("open");
      _m.style.display = "none";
    }
  })();
  show("pgLogin");
  document.getElementById("lgU").value = "";
  document.getElementById("lgP").value = "";
  document.getElementById("lgE").textContent = "";
  toast("Atsijungta");
});
on("logoutCancel", "click", function () {
  (function () {
    var _m = document.getElementById("logoutModal");
    if (_m) {
      _m.classList.remove("open");
      _m.style.display = "none";
    }
  })();
});
// SEARCH
on("srchInp", "input", renderJobs);
// FILTER CHIPS
document.querySelectorAll(".chip[data-f]").forEach(function (c) {
  c.addEventListener("click", function () {
    filt = this.getAttribute("data-f");
    document.querySelectorAll(".chip[data-f]").forEach(function (x) {
      x.classList.toggle("on", x.getAttribute("data-f") === filt);
    });
    renderJobs();
  });
});
// JOBS
function renderJobs() {
  var q = (document.getElementById("srchInp").value || "").toLowerCase();
  var list = JOBS.filter(function (j) {
    var mf =
      filt === "all" ||
      (filt === "new" && j.st === "new") ||
      (filt === "work" && j.st === "work") ||
      (filt === "stop" && j.st === "stop");
    var ms =
      !q ||
      j.name.toLowerCase().indexOf(q) >= 0 ||
      (j.num || "").toLowerCase().indexOf(q) >= 0;
    return mf && ms;
  });
  var el = document.getElementById("jList");
  if (!el) return;
  var a = document.getElementById("fnAll");
  if (a) a.textContent = JOBS.length;
  var b = document.getElementById("fnNew");
  if (b)
    b.textContent = JOBS.filter(function (j) {
      return j.st === "new";
    }).length;
  var c = document.getElementById("fnStop");
  if (c)
    c.textContent = JOBS.filter(function (j) {
      return j.st === "stop";
    }).length;
  var w = document.getElementById("fnWork");
  if (w)
    w.textContent = JOBS.filter(function (j) {
      return j.st === "work";
    }).length;
  el.innerHTML = list
    .map(function (j) {
      var ti = TI[j.type] || TI.apt,
        si = SI[j.st] || SI.new;
      return (
        '<div class="jcard t' +
        j.type +
        " s-" +
        j.st +
        '" data-jid="' +
        j.id +
        '" style="' +
        (j.st === "stop" ? "opacity:0.65;" : "") +
        '">' +
        '<div class="jico" style="background:' +
        ti.bg +
        ';">' +
        sv(JP[j.type] || JP.apt, 22).replace(
          'stroke="currentColor"',
          'stroke="' + ti.str + '"',
        ) +
        "</div>" +
        '<div class="jbody">' +
        '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:2px;">' +
        '<div class="jname">' +
        j.client +
        "</div>" +
        '<span class="st ' +
        si.cls +
        '">' +
        si.lbl +
        "</span>" +
        "</div>" +
        '<div style="font-size:11px;color:var(--t3);margin-bottom:3px;font-weight:500;">' +
        j.obj +
        "</div>" +
        '<div class="jaddr">' +
        sv(
          '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
          13,
        ) +
        j.addr +
        "</div>" +
        '<div class="jrow"><span class="jdate">Sukurta: ' +
        j.date +
        '</span><span class="jnum">' +
        (j.num || j.id) +
        "</span></div>" +
        "</div>" +
        "</div>"
      );
    })
    .join("");
  el.querySelectorAll(".jcard").forEach(function (card) {
    card.addEventListener("click", function () {
      openJob(parseInt(this.getAttribute("data-jid")));
    });
  });
}

function openJob(id) {
  cid = id;
  var j = JOBS.find(function (x) {
    return x.id === id;
  });
  document.getElementById("detNum").textContent = j.num || j.id;
  var si = SI[j.st] || SI.new;
  var stEl = document.getElementById("detSt");
  if (stEl) {
    stEl.className = "st " + si.cls;
    stEl.textContent = si.lbl;
  }
  renderDet();
  show("pgDetail");
  startLive();

  on("detBack", "click", function () {
    clearInterval(liveInt);
    show("pgJobs");
    renderJobs();
  });
}
function startLive() {
  clearInterval(liveInt);
  liveInt = setInterval(function () {
    var j = JOBS.find(function (x) {
      return x.id === cid;
    });
    if (!j || !j.running) return;
    var el = document.getElementById("tv-" + j.running);
    if (el) el.textContent = lv(j, j.running);
  }, 1000);
}
function toggleTimer(type) {
  var j = JOBS.find(function (x) {
    return x.id === cid;
  });
  if (j.running === type) {
    j.timers[type] += Math.floor((Date.now() - j.rs) / 1000);
    j.running = null;
    j.rs = null;
    if (type === "work") {
      j.st = "stop";
    }
    toast("Sustabdyta");
  } else {
    // Stop any other job that is currently running
    JOBS.forEach(function (x) {
      if (x.id !== cid && x.running) {
        x.timers[x.running] += Math.floor((Date.now() - x.rs) / 1000);
        x.running = null;
        x.rs = null;
      }
    });
    if (j.running)
      j.timers[j.running] += Math.floor((Date.now() - j.rs) / 1000);
    j.running = type;
    j.rs = Date.now();
    if (type === "work") {
      JOBS.forEach(function (x) {
        if (x.id !== cid && x.st === "work") {
          x.st = "stop";
        }
      });
      j.st = "work";
    }
    toast("Pradėta");
  }
  renderDet();
  startLive();
}

function checkNote(showHint) {
  var j = JOBS.find(function (x) {
    return x.id === cid;
  });
  var btn = document.getElementById("finBtn");
  var hint = document.getElementById("nhint");
  if (!btn) return;
  var ok = j && j.notes && j.notes.trim().length >= 3;
  btn.disabled = !ok;
  if (hint)
    hint.textContent =
      showHint && !ok ? "Prieš užbaigiant būtina įrašyti pastabas" : "";
}
function renderDet() {
  var j = JOBS.find(function (x) {
    return x.id === cid;
  });
  if (!j) return;
  var ti = TI[j.type] || TI.apt,
    si = SI[j.st] || SI.new;
  var TC = [
    {
      k: "prep",
      lbl: "PASIRUOŠIMAS",
      sub: "Pasiruošimo darbams",
      ico: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
      cls: "prep",
    },
    {
      k: "trav",
      lbl: "KELIONĖ",
      sub: "Važiavimas į objektą",
      ico: '<rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
      cls: "trav",
    },
    {
      k: "work",
      lbl: "DARBAS",
      sub: "Darbų atlikimas objekte",
      ico: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
      cls: "work",
    },
  ];
  var h = "";
  h +=
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;"><span class="st ' +
    si.cls +
    '">' +
    si.lbl +
    '</span><span class="' +
    ti.cls +
    '" style="font-size:12px;font-weight:600;">' +
    ti.lbl +
    "</span></div>";
  h +=
    '<div style="font-size:19px;font-weight:800;letter-spacing:-.3px;margin-bottom:2px;">' +
    j.client +
    "</div>";
  h +=
    '<div style="font-size:12px;color:var(--t3);font-weight:500;margin-bottom:10px;">' +
    j.obj +
    "</div>";
  h +=
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">';
  h +=
    '<div style="font-size:13px;color:var(--t2);display:flex;align-items:center;gap:5px;">' +
    sv(
      '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
      14,
    ) +
    j.addr +
    "</div>";
  h +=
    '<a href="https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(j.addr) +
    '" target="_blank" style="width:42px;height:42px;background:var(--accb);border-radius:12px;display:flex;align-items:center;justify-content:center;text-decoration:none;color:var(--acc);flex-shrink:0;">' +
    sv('<polygon points="3 11 22 2 13 21 11 13 3 11"/>', 20) +
    "</a>";
  h += "</div>";
  if (j.phone) {
    h += '<div class="contact-card" style="margin-bottom:12px;">';
    h +=
      '<div class="cav">' +
      sv(
        '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        20,
      ) +
      "</div>";
    h +=
      '<div style="flex:1;"><div style="font-size:13px;font-weight:700;">' +
      (j.contactName || j.client) +
      '</div><div style="font-size:11px;color:var(--t3);">' +
      (j.contactRole || "") +
      "</div></div>";
    h +=
      '<div style="display:flex;gap:6px;"><a href="tel:' +
      j.phone +
      '" class="cbtn call">' +
      sv(
        '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
        17,
      ) +
      "</a></div>";
    h += "</div>";
  }
  h +=
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:12px 14px;margin-bottom:2px;"><div style="font-size:11px;color:var(--t3);margin-bottom:4px;">Aprašymas</div><div style="font-size:13px;color:var(--t);line-height:1.6;">' +
    j.desc +
    "</div></div>";
  h += '<div class="sec">Laiko sekimas</div>';
  h += '<div style="position:relative;">';
  h +=
    '<div style="position:absolute;left:30px;top:48px;bottom:48px;width:2px;background:var(--bdr);z-index:0;border-radius:1px;"></div>';
  TC.forEach(function (t) {
    var r = j.running === t.k;
    h +=
      '<div class="tcrd" style="position:relative;z-index:1;' +
      (r
        ? "box-shadow:0 2px 12px rgba(26,86,160,0.22);border-left:3px solid var(--acc);"
        : "border-left:3px solid transparent;") +
      '">';
    h += '<div class="tico ' + t.cls + '">' + sv(t.ico, 22) + "</div>";
    h +=
      '<div style="flex:1;"><div class="ttype ' +
      t.cls +
      '">' +
      t.lbl +
      '</div><div class="tsub">' +
      t.sub +
      "</div>";
    h +=
      '<div class="tval' +
      (r ? " run" : "") +
      '" id="tv-' +
      t.k +
      '">' +
      lv(j, t.k) +
      "</div></div>";
    var isRunningOther = j.running && j.running !== t.k;
    h +=
      '<button class="tbtn ' +
      t.cls +
      (isRunningOther ? " tbtn-dis" : "") +
      '" data-tk="' +
      t.k +
      '" ' +
      (isRunningOther
        ? 'disabled style="opacity:.35;cursor:not-allowed;"'
        : "") +
      ">" +
      sv(
        r
          ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
          : '<polygon points="5 3 19 12 5 21 5 3"/>',
        13,
      ) +
      (r ? "STOP" : "START") +
      "</button>";
    h += "</div>";
  });
  h += "</div>";
  h += '<div class="sec">Nuotraukos ir medžiagos</div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:4px;">';
  h +=
    '<div style="width:76px;height:76px;border-radius:12px;background:var(--bg3);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;color:var(--t2);font-size:10px;font-weight:700;" id="camBtn">' +
    sv(
      '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3L14.5 4z"/><circle cx="12" cy="13" r="3"/>',
      20,
    ) +
    "Nuotrauka</div>";
  h +=
    '<div style="width:76px;height:76px;border-radius:12px;background:var(--accb);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;color:var(--acc);font-size:10px;font-weight:700;" id="matBtn">' +
    sv(
      '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
      20,
    ) +
    "Medžiagos</div>";
  h +=
    '<div style="width:76px;height:76px;border-radius:12px;background:rgba(109,40,217,0.1);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;color:#7C3AED;font-size:10px;font-weight:700;" id="sigBtn">' +
    sv(
      '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
      20,
    ) +
    "Parašas</div>";
  h += "</div>";
  h += '<div id="sigPreview"></div>';
  h += '<div class="sec">Pastabos</div>';
  h +=
    '<textarea class="nta" id="noteArea" placeholder="Privaloma įrašyti pastabas...">' +
    j.notes +
    "</textarea>";
  h += '<div class="nhint" id="nhint"></div>';
  h +=
    '<div style="padding:4px 0 20px;"><button class="fbtn" id="finBtn" disabled>UŽBAIGTI DARBĄ<div class="chk">' +
    sv('<polyline points="20 6 9 17 4 12"/>', 16) +
    "</div></button></div>";
  document.getElementById("detBody").innerHTML = h;
  // Attach events
  document
    .getElementById("detBody")
    .querySelectorAll(".tbtn")
    .forEach(function (btn) {
      btn.addEventListener("click", function () {
        toggleTimer(this.getAttribute("data-tk"));
      });
    });
  on("noteArea", "input", function () {
    JOBS.find(function (x) {
      return x.id === cid;
    }).notes = this.value;
    checkNote(false);
  });
  on("finBtn", "click", function () {
    var j = JOBS.find(function (x) {
      return x.id === cid;
    });
    var ok = j && j.notes && j.notes.trim().length >= 3;
    if (!ok) {
      checkNote(true);
      return;
    }
    toast("Darbas sėkmingai užbaigtas!");
    clearInterval(liveInt);
    setTimeout(function () {
      show("pgJobs");
      renderJobs();
    }, 1200);
  });
  on("camBtn", "click", function () {
    toast("Fotoaparatas atidaromas...");
  });
  on("matBtn", "click", function () {
    openModal("matsModal");
  });
  on("sigBtn", "click", function () {
    openModal("sigModal");
  });
  checkNote(false);
}

// MSGS
on("markAll", "click", function () {
  MSGS.forEach(function (m) {
    m.read = true;
  });
  renderMsgs();
  toast("Visos perskaityta");
});

function renderMsgs() {
  var icCls = { new: "mnew", del: "mdel", upd: "mupd", warn: "mwarn" };
  var icP = {
    new: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    del: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    upd: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
    warn: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  };
  document.getElementById("msgList").innerHTML = MSGS.map(function (m) {
    return (
      '<div class="mcrd' +
      (m.read ? " read-msg" : "") +
      '" style="cursor:default;">' +
      '<div class="mico ' +
      (icCls[m.type] || "mupd") +
      '">' +
      sv(icP[m.type] || icP.upd, 20) +
      "</div>" +
      '<div style="flex:1;">' +
      '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:2px;">' +
      '<div class="mtitle" style="flex:1;">' +
      m.title +
      "</div>" +
      '<div class="mtime" style="white-space:nowrap;flex-shrink:0;padding-top:1px;">' +
      m.time +
      "</div>" +
      "</div>" +
      '<div class="mtext">' +
      m.text +
      "</div>" +
      "</div>" +
      (!m.read ? '<div class="mdot"></div>' : "") +
      "</div>"
    );
  }).join("");
}

// CALENDAR
var BUD = [
  [2026, 4, 18],
  [2026, 4, 19],
  [2026, 4, 20],
  [2026, 4, 21],
  [2026, 4, 22],
  [2026, 4, 23],
  [2026, 4, 24],
];
var ATO = [
  [2026, 4, 26],
  [2026, 4, 27],
  [2026, 4, 28],
];
var MNTHS = [
  "Sausis",
  "Vasaris",
  "Kovas",
  "Balandis",
  "Gegužė",
  "Birželis",
  "Liepa",
  "Rugpjūtis",
  "Rugsėjis",
  "Spalis",
  "Lapkritis",
  "Gruodis",
];
on("calPrev", "click", function () {
  calM--;
  if (calM < 0) {
    calM = 11;
    calY--;
  }
  renderCal();
});
on("calNext", "click", function () {
  calM++;
  if (calM > 11) {
    calM = 0;
    calY++;
  }
  renderCal();
});
function renderCal() {
  var lbl = document.getElementById("calLbl");
  if (lbl) lbl.textContent = MNTHS[calM] + " " + calY;
  var grid = document.getElementById("calGrid");
  if (!grid) return;
  var days = ["Pr", "An", "Tr", "Kt", "Pn", "Šš", "Sk"];
  var h = days
    .map(function (d) {
      return '<div class="cal-dn">' + d + "</div>";
    })
    .join("");
  var first = new Date(calY, calM, 1).getDay(),
    start = first === 0 ? 6 : first - 1;
  var dim = new Date(calY, calM + 1, 0).getDate(),
    prev = new Date(calY, calM, 0).getDate();
  var today = new Date();
  for (var i = 0; i < start; i++)
    h += '<div class="cal-d other">' + (prev - start + i + 1) + "</div>";
  for (var d = 1; d <= dim; d++) {
    var isT =
      today.getFullYear() === calY &&
      today.getMonth() === calM &&
      today.getDate() === d;
    var isBud = BUD.some(function (x) {
      return x[0] === calY && x[1] === calM && x[2] === d;
    });
    var isAto = ATO.some(function (x) {
      return x[0] === calY && x[1] === calM && x[2] === d;
    });
    var cls = isT ? "today" : isBud ? "bud" : isAto ? "ato" : "";
    h += '<div class="cal-d ' + cls + '">' + d + "</div>";
  }
  grid.innerHTML = h;
}

// OBJECTS
on("goObjects", "click", function () {
  show("pgObjects");
  renderObjects();
});
on("objBack", "click", function () {
  show("pgMore");
});
on("odBack", "click", function () {
  show("pgObjects");
});

function renderObjects() {
  document.getElementById("objList").innerHTML = OBJECTS.map(function (o) {
    return (
      '<div class="obj-card" data-oid="' +
      o.id +
      '">' +
      '<div class="obj-ico">' +
      sv(
        '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
        22,
      ) +
      "</div>" +
      '<div style="flex:1;"><div style="font-size:14px;font-weight:700;">' +
      o.name +
      '</div><div style="font-size:12px;color:var(--t3);margin-top:1px;">' +
      o.addr +
      "</div></div>" +
      sv('<path d="m9 18 6-6-6-6"/>', 16) +
      "</div>"
    );
  }).join("");
  document
    .getElementById("objList")
    .querySelectorAll(".obj-card")
    .forEach(function (c) {
      c.addEventListener("click", function () {
        openObj(parseInt(this.getAttribute("data-oid")));
      });
    });
}
function openObj(id) {
  curObj = OBJECTS.find(function (x) {
    return x.id === id;
  });
  credVis = {};
  document.getElementById("odTitle").textContent = curObj.name;
  renderObjDet();
  show("pgObjDet");
}
function renderObjDet() {
  var o = curObj;
  var CREDS = [
    { key: "nvr", lbl: "NVR / DVR" },
    { key: "ip", lbl: "IP adresas" },
    { key: "alarm_inst", lbl: "Signalizacija Installer" },
    { key: "alarm_master", lbl: "Signalizacija Master" },
  ];
  var h = "";
  h += '<div class="sec" style="margin-top:0;">Informacija</div>';
  h +=
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);overflow:hidden;margin-bottom:12px;">';
  h +=
    '<div style="padding:11px 14px;border-bottom:1px solid var(--bdr);"><div style="font-size:11px;color:var(--t3);margin-bottom:3px;">Adresas</div><div style="font-size:13px;font-weight:600;color:var(--t);">' +
    o.addr +
    "</div></div>";
  h +=
    '<div style="padding:11px 14px;"><div style="font-size:11px;color:var(--t3);margin-bottom:3px;">Sistemos</div><div style="font-size:13px;font-weight:600;color:var(--t);">' +
    o.systems +
    "</div></div>";
  h += "</div>";
  h += '<div class="sec">Kontaktai</div>';
  o.contacts.forEach(function (c) {
    h +=
      '<div class="contact-card"><div class="cav">' +
      sv(
        '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        20,
      ) +
      "</div>";
    h +=
      '<div style="flex:1;"><div style="font-size:13px;font-weight:700;">' +
      c.name +
      '</div><div style="font-size:11px;color:var(--t3);">' +
      c.role +
      "</div></div>";
    h +=
      '<div style="display:flex;gap:6px;"><a href="tel:' +
      c.phone +
      '" class="cbtn call">' +
      sv(
        '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
        17,
      ) +
      "</a>";
    h +=
      '<a href="sms:' +
      c.phone +
      '" class="cbtn sms">' +
      sv(
        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
        17,
      ) +
      "</a></div></div>";
  });
  h += '<div class="sec">Sistemos prisijungimai</div>';
  h += '<div class="cred-section" style="margin-bottom:12px;">';
  CREDS.forEach(function (c) {
    var vis = credVis[c.key];
    var val = o.creds && o.creds[c.key] ? o.creds[c.key] : "–";
    h += '<div class="cred-row">';
    h += '<div style="flex:1;"><div class="cred-lbl">' + c.lbl + "</div>";
    h +=
      '<div class="cred-val' +
      (vis ? "" : " hidden") +
      '" id="cv-' +
      c.key +
      '" style="' +
      (vis ? "color:var(--acc);" : "") +
      '">' +
      (vis ? val : "••••••••") +
      "</div></div>";
    h += '<div class="cred-btns">';
    h +=
      '<button class="cred-btn" data-ck="' +
      c.key +
      '" data-act="copy">Copy</button>';
    h +=
      '<button class="cred-btn" data-ck="' +
      c.key +
      '" data-act="toggle">' +
      (vis
        ? sv(
            '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
            16,
          )
        : sv(
            '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
            16,
          )) +
      "</button>";
    h += "</div></div>";
  });
  h += "</div>";
  h += '<div class="sec">Brėžiniai</div>';
  h +=
    '<div class="fcrd" id="drawingsBtn"><div class="fico" style="background:var(--accb);">' +
    sv(
      '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
      22,
    ).replace('stroke="currentColor"', 'stroke="var(--acc)"') +
    "</div>";
  h +=
    '<div style="flex:1;"><div style="font-size:14px;font-weight:700;">Brėžiniai</div><div style="font-size:12px;color:var(--t3);">' +
    o.drawings.length +
    " failai</div></div>" +
    sv('<path d="m9 18 6-6-6-6"/>', 16) +
    "</div>";
  h += '<div class="sec">Darbų istorija</div>';
  h +=
    '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px;">';
  o.hist.forEach(function (x) {
    h +=
      '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:12px 14px;">';
    h +=
      '<div style="font-size:13px;font-weight:700;margin-bottom:2px;">' +
      x.who +
      ' <span style="font-size:11px;font-weight:500;color:var(--t3);">· ' +
      x.when +
      "</span></div>";
    h +=
      '<div style="font-size:12px;color:var(--t2);">' + x.what + "</div></div>";
  });
  h += "</div>";
  document.getElementById("odBody").innerHTML = h;
  // Cred buttons
  document
    .getElementById("odBody")
    .querySelectorAll(".cred-btn")
    .forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = this.getAttribute("data-ck"),
          act = this.getAttribute("data-act");
        var val = curObj.creds && curObj.creds[key] ? curObj.creds[key] : "";
        if (act === "copy") {
          var btn = this;
          var origTxt = btn.textContent;
          if (navigator.clipboard && val)
            navigator.clipboard.writeText(val).then(function () {
              btn.textContent = "✓ Nukopijuota";
              btn.style.color = "#16A34A";
              btn.style.background = "rgba(22,163,74,0.1)";
              setTimeout(function () {
                btn.textContent = origTxt;
                btn.style.color = "";
                btn.style.background = "";
              }, 1800);
            });
          else {
            btn.textContent = "✓ Nukopijuota";
            btn.style.color = "#16A34A";
            btn.style.background = "rgba(22,163,74,0.1)";
            setTimeout(function () {
              btn.textContent = origTxt;
              btn.style.color = "";
              btn.style.background = "";
            }, 1800);
          }
        } else {
          credVis[key] = !credVis[key];
          renderObjDet();
        }
      });
    });
  var db = document.getElementById("drawingsBtn");
  if (db)
    db.addEventListener("click", function () {
      openDrawings();
    });
}
function openDrawings() {
  document.getElementById("drawList").innerHTML = curObj.drawings
    .map(function (d) {
      return (
        '<div class="pcrd"><div class="pico">' +
        sv(
          '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
          18,
        ) +
        '</div><div style="flex:1;font-size:13px;font-weight:600;">' +
        d +
        "</div></div>"
      );
    })
    .join("");
  document
    .getElementById("drawList")
    .querySelectorAll(".pcrd")
    .forEach(function (c, i) {
      c.addEventListener("click", function () {
        toast(curObj.drawings[i] + " – atidaroma...");
      });
    });
  openModal("drawModal");
}

// INSTRUKCIJOS
on("goInstr", "click", function () {
  instrFolder = null;
  show("pgInstr");
  renderInstr();
});
on("goAtas", "click", function () {
  show("pgAtas");
  renderAtas();
});
on("goDuty", "click", function () {
  show("pgDuty");
  renderDuty();
});
on("dutyBack", "click", function () {
  show("pgMore");
});
on("atasBack", "click", function () {
  show("pgMore");
});
on("instrBack", "click", function () {
  if (instrFolder) {
    instrFolder = null;
    renderInstr();
  } else {
    show("pgMore");
  }
});

function renderInstr() {
  var el = document.getElementById("instrContent");
  if (!el) return;
  var dark = document.body.classList.contains("dark");
  if (!instrFolder) {
    el.innerHTML =
      '<div style="display:flex;flex-direction:column;gap:8px;">' +
      INSTR_FOLDERS.map(function (f) {
        var bg = dark ? f.darkColor : f.color;
        return (
          '<div class="fcrd" data-fid="' +
          f.id +
          '"><div class="fico" style="background:' +
          bg +
          ';">' +
          sv(
            '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
            22,
          ) +
          "</div>" +
          '<div style="flex:1;"><div style="font-size:14px;font-weight:700;">' +
          f.name +
          '</div><div style="font-size:12px;color:' +
          (dark ? "#8899B4" : "var(--t3)") +
          ';">' +
          f.files.length +
          " failai</div></div>" +
          sv('<path d="m9 18 6-6-6-6"/>', 16) +
          "</div>"
        );
      }).join("") +
      "</div>";
    el.querySelectorAll(".fcrd[data-fid]").forEach(function (c) {
      c.addEventListener("click", function () {
        instrFolder = this.getAttribute("data-fid");
        renderInstr();
      });
    });
  } else {
    var f = INSTR_FOLDERS.find(function (x) {
      return x.id === instrFolder;
    });
    var h = '<div id="instrBk" style="display:none;"></div>';
    h +=
      '<div style="font-size:18px;font-weight:800;margin-bottom:14px;">' +
      f.name +
      "</div>";
    h += f.files
      .map(function (file) {
        return (
          '<div class="pcrd" data-fn="' +
          file.n +
          '">' +
          '<div class="pico">' +
          sv(
            '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
            18,
          ) +
          "</div>" +
          '<div style="flex:1;">' +
          '<div style="font-size:13px;font-weight:600;">' +
          file.n +
          "</div>" +
          '<div style="font-size:11px;color:' +
          (dark ? "#8899B4" : "var(--t3)") +
          ';margin-top:2px;">PDF · ' +
          file.s +
          "</div>" +
          "</div></div>"
        );
      })
      .join("");
    el.innerHTML = h;
    el.querySelectorAll(".pcrd[data-fn]").forEach(function (c) {
      c.addEventListener("click", function () {
        toast(this.getAttribute("data-fn") + " – atidaroma...");
      });
    });
    var bk = document.getElementById("instrBk");
    if (bk)
      bk.addEventListener("click", function () {
        instrFolder = null;
        renderInstr();
      });
  }
}

// MORE - THEME
function updateMoreHeader() {
  var h = document.getElementById("moreHeader");
  if (!h) return;
  if (isDark) {
    h.style.background =
      "linear-gradient(160deg,#0D1E38 0%,#162033 60%,#1A2840 100%)";
  } else {
    h.style.background =
      "linear-gradient(160deg,#0B2D6E 0%,#1245A0 50%,#1A56BF 100%)";
  }
}
function toggleMoreMenu() {
  var drop = document.getElementById("moreMenuDrop");
  if (!drop) return;
  drop.style.display = drop.style.display === "none" ? "block" : "none";
}
// Close menu on outside click
document.addEventListener("click", function (e) {
  var btn = document.getElementById("moreMenuBtn");
  var drop = document.getElementById("moreMenuDrop");
  if (drop && btn && !btn.contains(e.target) && !drop.contains(e.target)) {
    drop.style.display = "none";
  }
});
function showLogout() {
  document.getElementById("moreMenuDrop").style.display = "none";
  var lm = document.getElementById("logoutModal");
  document.body.appendChild(lm);
  lm.style.display = "block";
  lm.style.backgroundColor = "rgba(15,23,42,0.6)";
  var panel = lm.querySelector(".mpanel");
  if (panel) {
    panel.style.position = "absolute";
    panel.style.left = "0";
    panel.style.right = "0";
    panel.style.bottom = "0";
    panel.style.width = "100%";
    panel.style.boxSizing = "border-box";
    panel.style.borderRadius = "20px 20px 0 0";
  }
  lm.classList.add("open");
}
function toggleTheme() {
  isDark = !isDark;
  if (document.body) document.body.classList.toggle("dark", isDark);
  var sun = document.getElementById("icoSun");
  var moon = document.getElementById("icoMoon");
  var lbl = document.getElementById("themeLabelMenu");
  if (sun) sun.style.display = isDark ? "block" : "none";
  if (moon) moon.style.display = isDark ? "none" : "block";
  if (lbl) lbl.textContent = isDark ? "Šviesi tema" : "Tamsi tema";
  updateMoreHeader();
}

// MODALS
function openModal(id) {
  var el = document.getElementById(id);
  if (!el) return;
  document.body.appendChild(el);
  el.setAttribute(
    "style",
    "position:fixed !important;top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;z-index:99999 !important;display:block !important;",
  );
  // Add backdrop div if not exists
  var bd = el.querySelector(".modal-backdrop");
  if (!bd) {
    bd = document.createElement("div");
    bd.className = "modal-backdrop";
    bd.setAttribute(
      "style",
      "position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.65);",
    );
    el.insertBefore(bd, el.firstChild);
    bd.addEventListener("click", function () {
      el.style.display = "none";
      el.classList.remove("open");
    });
  }
  var panel = el.querySelector(".mpanel");
  if (panel) {
    var isDarkMode = document.body.classList.contains("dark");
    var panelBg = isDarkMode ? "#1e293b" : "#ffffff";
    panel.style.position = "absolute";
    panel.style.left = "0";
    panel.style.right = "0";
    panel.style.bottom = "0";
    panel.style.width = "100%";
    panel.style.maxHeight = "92vh";
    panel.style.boxSizing = "border-box";
    panel.style.overflow = "hidden";
    panel.style.margin = "0";
    panel.style.borderRadius = "20px 20px 0 0";
    panel.style.background = panelBg;
    panel.style.display = "flex";
    panel.style.flexDirection = "column";
  }
  el.classList.add("open");
}
on("drawClose", "click", function () {
  (function () {
    var _m = document.getElementById("drawModal");
    if (_m) {
      _m.classList.remove("open");
      _m.style.display = "none";
    }
  })();
});
on("matsClose", "click", function () {
  (function () {
    var _m = document.getElementById("matsModal");
    if (_m) {
      _m.classList.remove("open");
      _m.style.display = "none";
    }
  })();
});
on("matAdd", "click", function () {
  var inp = document.getElementById("matInp"),
    val = inp.value.trim();
  if (!val) return;
  var list = document.getElementById("matList");
  var d = document.createElement("div");
  d.style.cssText =
    "background:var(--bg3);border-radius:10px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;";
  d.innerHTML =
    '<span style="font-size:13px;font-weight:600;">' +
    val +
    '</span><button style="background:none;border:none;color:#DC2626;cursor:pointer;font-size:16px;padding:0;">&#x2715;</button>';
  d.querySelector("button").addEventListener("click", function () {
    d.remove();
  });
  list.appendChild(d);
  inp.value = "";
  toast("Medžiaga pridėta");
});

function renderAtas() {
  var el = document.getElementById("atasContent");
  if (!el) return;
  // Data: work, travel, prep hours per working day in May 2026
  var days = [
    { d: 1, w: 6.0, t: 3.5, p: 0.5 },
    { d: 2, w: 1.0, t: 3.5, p: 0.5 },
    { d: 3, w: 6.5, t: 2.0, p: 0.5 },
    { d: 4, w: 7.0, t: 2.5, p: 0.5 },
    { d: 7, w: 6.0, t: 3.5, p: 0.5 },
    { d: 8, w: 7.5, t: 2.5, p: 0.5 },
    { d: 9, w: 7.0, t: 3.5, p: 0.5 },
    { d: 10, w: 8.0, t: 0.0, p: 0.0 },
    { d: 11, w: 8.0, t: 0.0, p: 0.0 },
    { d: 14, w: 8.0, t: 0.0, p: 0.0 },
    { d: 15, w: 7.0, t: 1.5, p: 0.5 },
    { d: 16, w: 6.5, t: 2.0, p: 0.5 },
    { d: 22, w: 9.0, t: 0.5, p: 0.0 },
    { d: 23, w: 6.0, t: 1.0, p: 0.0 },
    { d: 24, w: 5.5, t: 1.0, p: 0.0 },
  ];
  var totalW = days.reduce(function (a, d) {
    return a + d.w;
  }, 0);
  var totalT = days.reduce(function (a, d) {
    return a + d.t;
  }, 0);
  var totalP = days.reduce(function (a, d) {
    return a + d.p;
  }, 0);
  var total = totalW + totalT + totalP;
  function fmt(h) {
    var hh = Math.floor(h),
      mm = Math.round((h - hh) * 60);
    return hh + " val." + (mm > 0 ? " " + mm + " min." : "");
  }
  function pct(v) {
    return Math.round((v / total) * 100) + "%";
  }

  // Chart dimensions
  var ctnW = 520;
  var padL = 28,
    padR = 4,
    padT = 22,
    padB = 28;
  var chartW = ctnW - padL - padR;
  var H = 222;
  var chartH = H - padT - padB;
  var maxH = 12;
  var n = days.length;
  var barW = Math.floor((chartW / n) * 0.55);
  var xStep = chartW / n;
  var isDarkMode = document.body.classList.contains("dark");
  var gridColor = isDarkMode ? "rgba(255,255,255,0.06)" : "#E2E8F0";
  var gridW = isDarkMode ? "0.8" : "0.5";
  // Build SVG bars
  var bars = "";
  var labels = "";
  var valLabels = "";
  var rTop = 4;
  days.forEach(function (d, i) {
    var cx = padL + i * xStep + xStep / 2;
    var x = cx - barW / 2;
    var pxP = d.p > 0 ? Math.max(2, Math.round((d.p / maxH) * chartH)) : 0;
    var pxT = d.t > 0 ? Math.max(2, Math.round((d.t / maxH) * chartH)) : 0;
    var pxW = d.w > 0 ? Math.max(2, Math.round((d.w / maxH) * chartH)) : 0;
    var yBot = padT + chartH;
    var totalH = pxP + pxT + pxW;
    var totalVal = d.p + d.t + d.w;
    // Stacked bars — top segment gets rounded corners via path
    if (d.p > 0) {
      var yt = yBot - pxW - pxT - pxP;
      bars +=
        '<path d="M' +
        (Math.round(x) + rTop) +
        " " +
        yt +
        " Q" +
        Math.round(x) +
        " " +
        yt +
        " " +
        Math.round(x) +
        " " +
        (yt + rTop) +
        " L" +
        Math.round(x) +
        " " +
        (yt + pxP) +
        " L" +
        (Math.round(x) + barW) +
        " " +
        (yt + pxP) +
        " L" +
        (Math.round(x) + barW) +
        " " +
        (yt + rTop) +
        " Q" +
        (Math.round(x) + barW) +
        " " +
        yt +
        " " +
        (Math.round(x) + barW - rTop) +
        " " +
        yt +
        ' Z" fill="#22C55E"/>';
    } else if (d.t > 0) {
      var yt = yBot - pxW - pxT;
      bars +=
        '<path d="M' +
        (Math.round(x) + rTop) +
        " " +
        yt +
        " Q" +
        Math.round(x) +
        " " +
        yt +
        " " +
        Math.round(x) +
        " " +
        (yt + rTop) +
        " L" +
        Math.round(x) +
        " " +
        (yt + pxT) +
        " L" +
        (Math.round(x) + barW) +
        " " +
        (yt + pxT) +
        " L" +
        (Math.round(x) + barW) +
        " " +
        (yt + rTop) +
        " Q" +
        (Math.round(x) + barW) +
        " " +
        yt +
        " " +
        (Math.round(x) + barW - rTop) +
        " " +
        yt +
        ' Z" fill="#F97316"/>';
    } else if (d.w > 0) {
      var yt = yBot - pxW;
      bars +=
        '<path d="M' +
        (Math.round(x) + rTop) +
        " " +
        yt +
        " Q" +
        Math.round(x) +
        " " +
        yt +
        " " +
        Math.round(x) +
        " " +
        (yt + rTop) +
        " L" +
        Math.round(x) +
        " " +
        (yt + pxW) +
        " L" +
        (Math.round(x) + barW) +
        " " +
        (yt + pxW) +
        " L" +
        (Math.round(x) + barW) +
        " " +
        (yt + rTop) +
        " Q" +
        (Math.round(x) + barW) +
        " " +
        yt +
        " " +
        (Math.round(x) + barW - rTop) +
        " " +
        yt +
        ' Z" fill="#1A56A0"/>';
    }
    // Middle/bottom segments (no rounding)
    if (d.p > 0 && d.t > 0)
      bars +=
        '<rect x="' +
        Math.round(x) +
        '" y="' +
        (yBot - pxW - pxT) +
        '" width="' +
        barW +
        '" height="' +
        pxT +
        '" fill="#F97316"/>';
    if ((d.p > 0 || d.t > 0) && d.w > 0)
      bars +=
        '<rect x="' +
        Math.round(x) +
        '" y="' +
        (yBot - pxW) +
        '" width="' +
        barW +
        '" height="' +
        pxW +
        '" fill="#1A56A0"/>';
    else if (d.t > 0 && d.w > 0)
      bars +=
        '<rect x="' +
        Math.round(x) +
        '" y="' +
        (yBot - pxW) +
        '" width="' +
        barW +
        '" height="' +
        pxW +
        '" fill="#1A56A0"/>';
    // Day label
    labels +=
      '<text x="' +
      Math.round(cx) +
      '" y="' +
      (padT + chartH + 18) +
      '" text-anchor="middle" font-size="9" fill="#94A3B8">' +
      d.d +
      "</text>";
    // Value above bar
    if (totalVal > 0) {
      var totalH2 = pxP + pxT + pxW;
      valLabels +=
        '<text x="' +
        Math.round(cx) +
        '" y="' +
        (yBot - totalH2 - 5) +
        '" text-anchor="middle" font-size="8" fill="' +
        (isDarkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.3)") +
        '">' +
        totalVal +
        "h</text>";
    }
  });
  // Y axis labels
  var yLabels = "";
  for (var yi = 0; yi <= 12; yi += 2) {
    var yy = padT + chartH - Math.round((yi / maxH) * chartH);
    yLabels +=
      '<text x="' +
      (padL - 4) +
      '" y="' +
      (yy + 3) +
      '" text-anchor="end" font-size="9" fill="#94A3B8">' +
      yi +
      "</text>";
    yLabels +=
      '<line x1="' +
      padL +
      '" y1="' +
      yy +
      '" x2="' +
      (padL + chartW) +
      '" y2="' +
      yy +
      '" stroke="' +
      gridColor +
      '" stroke-width="' +
      gridW +
      '"/>';
  }
  // 8h norm line
  var normY = padT + chartH - Math.round((8 / maxH) * chartH);
  var normLine =
    '<line x1="' +
    padL +
    '" y1="' +
    normY +
    '" x2="' +
    (padL + chartW) +
    '" y2="' +
    normY +
    '" stroke="#1A56A0" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.7"/>';
  var svg =
    '<svg width="' +
    ctnW +
    '" height="' +
    H +
    '" viewBox="0 0 ' +
    ctnW +
    " " +
    H +
    '">' +
    yLabels +
    bars +
    normLine +
    valLabels +
    labels +
    "</svg>";
  el.innerHTML =
    '<div style="font-size:22px;font-weight:800;letter-spacing:-.4px;margin-bottom:4px;">Darbo laikas</div>' +
    '<div style="font-size:13px;color:var(--t2);margin-bottom:16px;">Peržiūrėk savo darbo laiką, keliones ir pasiruošimą.</div>' +
    // Month nav
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">' +
    '<button style="background:none;border:none;cursor:pointer;color:var(--t2);padding:4px 8px;font-size:18px;">&#8249;</button>' +
    '<div style="display:flex;align-items:center;gap:8px;font-size:15px;font-weight:700;">&#128197; Balandis 2026</div>' +
    '<button style="background:none;border:none;cursor:pointer;color:var(--t2);padding:4px 8px;font-size:18px;">&#8250;</button>' +
    "</div>" +
    // 3 stat cards
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:8px;">' +
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:12px 10px;">' +
    '<div style="color:#1A56A0;font-size:11px;font-weight:600;margin-bottom:4px;">Darbas</div>' +
    '<div style="font-size:15px;font-weight:800;">' +
    fmt(totalW) +
    "</div>" +
    '<div style="font-size:12px;color:#1A56A0;margin-top:2px;">' +
    pct(totalW) +
    "</div></div>" +
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:12px 10px;">' +
    '<div style="color:#F97316;font-size:11px;font-weight:600;margin-bottom:4px;">Kelionė</div>' +
    '<div style="font-size:15px;font-weight:800;">' +
    fmt(totalT) +
    "</div>" +
    '<div style="font-size:12px;color:#F97316;margin-top:2px;">' +
    pct(totalT) +
    "</div></div>" +
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:12px 10px;">' +
    '<div style="color:#16A34A;font-size:11px;font-weight:600;margin-bottom:4px;">Pasiruošimas</div>' +
    '<div style="font-size:15px;font-weight:800;">' +
    fmt(totalP) +
    "</div>" +
    '<div style="font-size:12px;color:#16A34A;margin-top:2px;">' +
    pct(totalP) +
    "</div></div>" +
    "</div>" +
    // Total
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:14px 16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">' +
    '<div style="display:flex;align-items:center;gap:12px;"><div style="width:36px;height:36px;border-radius:10px;background:rgba(26,86,160,.1);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#1A56A0;">&#931;</div>' +
    '<div><div style="font-size:11px;color:var(--t3);">Iš viso</div><div style="font-size:17px;font-weight:800;">' +
    fmt(total) +
    "</div></div></div>" +
    '<div style="font-size:16px;font-weight:800;color:#1A56A0;">100%</div>' +
    "</div>" +
    // Chart
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:14px;margin-bottom:16px;">' +
    '<div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:12px;font-size:12px;font-weight:600;">' +
    '<div style="display:flex;align-items:center;gap:5px;"><div style="width:10px;height:10px;background:#1A56A0;border-radius:50%;"></div>Darbas</div>' +
    '<div style="display:flex;align-items:center;gap:5px;"><div style="width:10px;height:10px;background:#F97316;border-radius:50%;"></div>Kelionė</div>' +
    '<div style="display:flex;align-items:center;gap:5px;"><div style="width:10px;height:10px;background:#22C55E;border-radius:50%;"></div>Pasiruošimas</div>' +
    '<div style="display:flex;align-items:center;gap:5px;"><div style="width:20px;height:2px;background:#1A56A0;border-top:2px dashed #1A56A0;"></div>Dienos norma (8 val.)</div>' +
    "</div>" +
    '<div style="font-size:10px;color:var(--t3);margin-bottom:4px;">Valandos</div>' +
    '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">' +
    svg +
    "</div>" +
    "</div>" +
    // Bottom stats
    '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:16px;">' +
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:12px 14px;">' +
    '<div style="font-size:11px;color:var(--t3);margin-bottom:4px;">Vidurkis per dieną</div>' +
    '<div style="font-size:15px;font-weight:800;">' +
    fmt(total / days.length) +
    "</div>" +
    '<div style="font-size:11px;color:var(--t2);margin-top:2px;">% nuo normos: ' +
    Math.round((total / days.length / 8) * 100) +
    "%</div></div>" +
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:12px 14px;">' +
    '<div style="font-size:11px;color:var(--t3);margin-bottom:4px;">Darbo dienos</div>' +
    '<div style="font-size:15px;font-weight:800;">' +
    days.length +
    " dienų</div>" +
    '<div style="font-size:11px;color:var(--t2);margin-top:2px;">Iš 22 darbo dienų</div></div>' +
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:12px 14px;">' +
    '<div style="font-size:11px;color:var(--t3);margin-bottom:4px;">Viršvalandžiai</div>' +
    '<div style="font-size:15px;font-weight:800;">' +
    fmt(Math.max(0, total - days.length * 8)) +
    "</div>" +
    '<div style="font-size:11px;color:var(--t2);margin-top:2px;">' +
    Math.round((Math.max(0, total - days.length * 8) / total) * 100) +
    "% nuo viso laiko</div></div>" +
    '<div style="background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:12px 14px;">' +
    '<div style="font-size:11px;color:var(--t3);margin-bottom:4px;">Ilgiausia diena</div>' +
    '<div style="font-size:15px;font-weight:800;">' +
    fmt(
      Math.max.apply(
        null,
        days.map(function (d) {
          return d.w + d.t + d.p;
        }),
      ),
    ) +
    "</div>" +
    '<div style="font-size:11px;color:var(--t2);margin-top:2px;">Balandžio 25 d.</div></div>' +
    "</div>" +
    "";
}

// TOAST
var ttimer;
function toast(msg) {
  clearTimeout(ttimer);
  var el = document.getElementById("tst");
  el.textContent = msg;
  el.classList.add("show");
  ttimer = setTimeout(function () {
    el.classList.remove("show");
  }, 2200);
}

// BUDEIJMAS (Duty Log)
var DUTY_LOG = [
  {
    id: 1,
    eng: "Tomas Kazlauskas",
    company: 'UAB "Elektrum Lietuva"',
    obj: "Šalčininkai 65MW",
    date: "2026-06-07 22:15",
    fault: "Nuolat signalizavo 14-as detektorius.",
    action: "Pakeistas detektorius Nr. 14. Atliktas pilnas sistemos testas.",
  },
  {
    id: 2,
    eng: "Algirdas Petraitis",
    company: 'UAB "Green Energy LT"',
    obj: "Ignalina 40MW saulės parkas",
    date: "2026-06-06 03:40",
    fault: "Gedimas UPS sistemoje — sistema neperjungė į atsarginį maitinimą.",
    action: "Pakeistas nublankęs modulis. Sistema atstatyta ir patikrinta.",
  },
  {
    id: 3,
    eng: "Marius Jonaitis",
    company: 'UAB "Elektrum Lietuva"',
    obj: "Varėna 20MW",
    date: "2026-05-31 19:30",
    fault: "Gaisro detektorius nuolat signalizuoja.",
    action: "Pakeistas detektorius Nr. 14. Atliktas pilnas sistemos testas.",
  },
  {
    id: 4,
    eng: "Tomas Kazlauskas",
    company: 'UAB "Litgrid"',
    obj: "Kaunas PST 330kV",
    date: "2026-05-28 01:20",
    fault: "Durų valdiklis nereagavo — prieiga blokuota.",
    action: "Durų valdiklis perkrautas. Atnaujinta prieigos teisių lentelė.",
  },
];
var dutyNextId = 5;
var dutyFilter = "month";

function renderDuty() {
  var el = document.getElementById("dutyList");
  if (!el) return;

  var searchEl = document.getElementById("dutySearch");
  var q = searchEl ? searchEl.value.trim().toLowerCase() : "";
  var CURRENT_USER = "Tomas Kazlauskas";

  var now = new Date();
  var filtered = DUTY_LOG.slice()
    .reverse()
    .filter(function (e) {
      if (dutyFilter === "month") {
        var d = new Date(e.date.replace(" ", "T"));
        if (
          d.getFullYear() !== now.getFullYear() ||
          d.getMonth() !== now.getMonth()
        )
          return false;
      }
      if (dutyFilter === "mine" && e.eng !== CURRENT_USER) return false;
      if (!q) return true;
      return (
        (
          e.eng +
          " " +
          e.company +
          " " +
          e.obj +
          " " +
          (e.fault || "") +
          " " +
          e.action
        )
          .toLowerCase()
          .indexOf(q) !== -1
      );
    });

  // Update filter chip styles
  ["month", "all", "mine"].forEach(function (f) {
    var ids = { month: "dutyFMonth", all: "dutyFAll", mine: "dutyFMine" };
    var btn = document.getElementById(ids[f]);
    if (!btn) return;
    var active = dutyFilter === f;
    btn.style.background = active ? "var(--acc)" : "var(--bg3)";
    btn.style.color = active ? "#fff" : "var(--t2)";
    btn.style.border = active
      ? "1.5px solid var(--acc)"
      : "1.5px solid var(--bdr)";
    btn.style.fontWeight = active ? "700" : "600";
  });

  if (filtered.length === 0) {
    el.innerHTML =
      '<div style="text-align:center;padding:32px 16px;color:var(--t3);font-size:13px;">Įrašų nerasta</div>';
    return;
  }

  el.innerHTML = filtered
    .map(function (e) {
      var initials = e.eng
        .split(" ")
        .map(function (w) {
          return w[0];
        })
        .join("")
        .toUpperCase();
      var LT_MONTHS = [
        "Sau",
        "Vas",
        "Kov",
        "Bal",
        "Geg",
        "Bir",
        "Lie",
        "Rgp",
        "Rgs",
        "Spa",
        "Lap",
        "Grd",
      ];
      var dateParts = e.date.split(" ");
      var timePart = dateParts[1] || "";
      var entryDate = new Date(e.date.replace(" ", "T"));
      var nowD = new Date();
      var diffMs = nowD - entryDate;
      var diffH = Math.floor(diffMs / 3600000);
      var diffD = Math.floor(diffMs / 86400000);
      var mon = LT_MONTHS[entryDate.getMonth()];
      var day = entryDate.getDate();
      var fullDate =
        day + " " + mon + " " + entryDate.getFullYear() + " \u00b7 " + timePart;
      var relLabel;
      if (diffH < 1) relLabel = "K\u0105 tik";
      else if (diffH < 24) relLabel = "Prie\u0161 " + diffH + " val.";
      else if (diffD === 1) relLabel = "Vakar \u00b7 " + timePart;
      else if (diffD < 7)
        relLabel = "Prie\u0161 " + diffD + " d. \u00b7 " + timePart;
      else relLabel = day + " " + mon + " \u00b7 " + timePart;
      return (
        '<div style="background:var(--bg2);border-radius:12px;padding:10px 12px;margin-bottom:8px;">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">' +
        '<div style="width:28px;height:28px;border-radius:50%;background:rgba(15,118,110,0.15);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#0F766E;flex-shrink:0;">' +
        initials +
        "</div>" +
        '<div style="font-size:13px;font-weight:700;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
        e.eng +
        "</div>" +
        '<div class="duty-date" style="font-size:11px;color:var(--t3);cursor:pointer;white-space:nowrap;text-decoration:underline dotted;" data-full="' +
        fullDate +
        '" data-rel="' +
        relLabel +
        '" onclick="var t=this;t.textContent=t.textContent===t.dataset.full?t.dataset.rel:t.dataset.full;">' +
        relLabel +
        "</div>" +
        "</div>" +
        '<div style="display:flex;flex-direction:column;gap:2px;background:var(--bg3);border-radius:7px;padding:5px 8px;margin-bottom:6px;">' +
        '<div style="display:flex;align-items:center;gap:5px;min-width:0;">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="var(--t3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="10" height="10" style="flex-shrink:0;"><rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>' +
        '<span style="font-size:11px;color:var(--t3);flex-shrink:0;">\u012em.\u00a0</span>' +
        '<span style="font-size:11px;font-weight:700;color:var(--t);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
        e.company +
        "</span>" +
        "</div>" +
        '<div style="display:flex;align-items:center;gap:5px;min-width:0;">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="var(--t3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="10" height="10" style="flex-shrink:0;"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>' +
        '<span style="font-size:11px;color:var(--t3);flex-shrink:0;">Obj.\u00a0</span>' +
        '<span style="font-size:11px;font-weight:700;color:var(--t);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
        e.obj +
        "</span>" +
        "</div>" +
        "</div>" +
        (e.fault
          ? '<div style="font-size:12px;color:var(--t2);line-height:1.5;margin-bottom:4px;"><span style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-right:4px;">Gedimas</span>' +
            e.fault +
            "</div>"
          : "") +
        '<div style="font-size:12px;color:var(--t2);line-height:1.5;">' +
        (e.action
          ? '<span style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-right:4px;">Atlikta</span>'
          : "") +
        e.action +
        "</div>" +
        (e.mgr
          ? '<div style="display:inline-flex;align-items:center;gap:4px;background:rgba(217,119,6,0.12);border-radius:6px;padding:3px 8px;margin-top:6px;font-size:11px;font-weight:700;color:#D97706;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>Perduota vadovui</div>'
          : "") +
        "</div>"
      );
    })
    .join("");
}

// Duty photo picker
var dutyPhotos = [];
on("dutyPhotoBtn", "click", function () {
  var inp = document.createElement("input");
  inp.type = "file";
  inp.accept = "image/*";
  inp.multiple = true;
  inp.onchange = function () {
    Array.prototype.forEach.call(inp.files, function (file) {
      var reader = new FileReader();
      reader.onload = function (ev) {
        dutyPhotos.push(ev.target.result);
        var list = document.getElementById("dutyPhotoList");
        if (!list) return;
        var wrap = document.createElement("div");
        wrap.style.cssText = "position:relative;width:60px;height:60px;";
        var idx = dutyPhotos.length - 1;
        wrap.innerHTML =
          '<img src="' +
          ev.target.result +
          '" style="width:60px;height:60px;object-fit:cover;border-radius:8px;border:1.5px solid var(--bdr);" />' +
          '<button onclick="dutyPhotos.splice(' +
          idx +
          ',1);this.parentNode.remove();" style="position:absolute;top:-4px;right:-4px;width:16px;height:16px;border-radius:50%;background:#DC2626;border:none;color:#fff;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;">✕</button>';
        list.appendChild(wrap);
      };
      reader.readAsDataURL(file);
    });
  };
  inp.click();
});

// Duty searchable dropdowns
var DUTY_COMPANIES = Array.from(
  new Set(
    OBJECTS.map(function (o) {
      return o.name;
    }),
  ),
).sort();
// Objects list: "Įmonė · Objektas" — reuse OBJECTS names as single-level for now
// In real app this would be per-company. Here we expose all object names.
var DUTY_OBJECTS = Array.from(
  new Set(
    OBJECTS.map(function (o) {
      return o.addr ? o.name : o.name;
    }),
  ),
).sort();

function dutyDropItems(type, q) {
  var list = type === "company" ? DUTY_COMPANIES : DUTY_OBJECTS;
  q = (q || "").toLowerCase().trim();
  return list.filter(function (v) {
    return !q || v.toLowerCase().indexOf(q) !== -1;
  });
}

function dutyRenderDrop(type) {
  var inpId = type === "company" ? "dutyCompanyInp" : "dutyObjInp";
  var dropId = type === "company" ? "dutyCompanyDrop" : "dutyObjDrop";
  var inp = document.getElementById(inpId);
  var drop = document.getElementById(dropId);
  if (!inp || !drop) return;
  var q = inp.value;
  var items = dutyDropItems(type, q);
  var iStyle =
    "padding:10px 12px;font-size:13px;cursor:pointer;border-bottom:1px solid var(--bdr);";
  var html = items
    .map(function (v) {
      return (
        '<div style="' +
        iStyle +
        '" onmousedown="dutyPickItem(\'' +
        type +
        '\',this)" data-val="' +
        v.replace(/"/g, "&quot;") +
        '">' +
        v +
        "</div>"
      );
    })
    .join("");
  // Always show "Įrašyti ranka" hint if user typed something not in list
  if (q && items.indexOf(q) === -1) {
    html +=
      '<div style="' +
      iStyle +
      'color:var(--acc);font-style:italic;border-bottom:none;" onmousedown="dutyPickManual(\'' +
      type +
      "')\">+ Naudoti „" +
      q.replace(/"/g, "&quot;") +
      '"</div>';
  }
  drop.innerHTML =
    html ||
    '<div style="padding:10px 12px;font-size:12px;color:var(--t3);">Nieko nerasta</div>';
  drop.style.display = "block";
}

function dutyPickItem(type, el) {
  var inpId = type === "company" ? "dutyCompanyInp" : "dutyObjInp";
  var dropId = type === "company" ? "dutyCompanyDrop" : "dutyObjDrop";
  document.getElementById(inpId).value = el.getAttribute("data-val");
  document.getElementById(dropId).style.display = "none";
}
function dutyPickManual(type) {
  var dropId = type === "company" ? "dutyCompanyDrop" : "dutyObjDrop";
  document.getElementById(dropId).style.display = "none";
}
function dutyOpenDropdown(type) {
  dutyRenderDrop(type);
}
function dutyFilterDropdown(type) {
  dutyRenderDrop(type);
}

// Close dropdowns on outside click
document.addEventListener("click", function (ev) {
  ["company", "obj"].forEach(function (type) {
    var inpId = type === "company" ? "dutyCompanyInp" : "dutyObjInp";
    var dropId = type === "company" ? "dutyCompanyDrop" : "dutyObjDrop";
    var inp = document.getElementById(inpId);
    var drop = document.getElementById(dropId);
    if (drop && inp && !inp.contains(ev.target) && !drop.contains(ev.target)) {
      drop.style.display = "none";
    }
  });
});

// Duty manager handoff toggle
var dutyMgrEnabled = false;
function dutySetMgr(val) {
  dutyMgrEnabled = val;
  var yesBtn = document.getElementById("dutyMgrYes");
  var noBtn = document.getElementById("dutyMgrNo");
  if (yesBtn) {
    yesBtn.style.background = val ? "var(--acc)" : "var(--bg3)";
    yesBtn.style.color = val ? "#fff" : "var(--t2)";
    yesBtn.style.fontWeight = val ? "700" : "600";
  }
  if (noBtn) {
    noBtn.style.background = val ? "var(--bg3)" : "var(--acc)";
    noBtn.style.color = val ? "var(--t2)" : "#fff";
    noBtn.style.fontWeight = val ? "600" : "700";
  }
}

on("dutyAddBtn", "click", function () {
  dutyMgrEnabled = false;
  dutySetMgr(false);
  dutyPhotos = [];
  var photoList = document.getElementById("dutyPhotoList");
  if (photoList) photoList.innerHTML = "";
  // Default to current datetime
  var now = new Date();
  var pad = function (n) {
    return n < 10 ? "0" + n : n;
  };
  var localDT =
    now.getFullYear() +
    "-" +
    pad(now.getMonth() + 1) +
    "-" +
    pad(now.getDate()) +
    "T" +
    pad(now.getHours()) +
    ":" +
    pad(now.getMinutes());
  document.getElementById("dutyDateInp").value = localDT;
  document.getElementById("dutyCompanyInp").value = "";
  document.getElementById("dutyObjInp").value = "";
  document.getElementById("dutyFaultInp").value = "";
  document.getElementById("dutyActInp").value = "";
  openModal("dutyModal");
});

on("dutyModalClose", "click", function () {
  (function () {
    var _m = document.getElementById("dutyModal");
    if (_m) {
      _m.classList.remove("open");
      _m.style.display = "none";
    }
  })();
});

on("dutySaveBtn", "click", function () {
  var company = document.getElementById("dutyCompanyInp").value.trim();
  var obj = document.getElementById("dutyObjInp").value.trim();
  var fault = document.getElementById("dutyFaultInp").value.trim();
  var act = document.getElementById("dutyActInp").value.trim();
  var dtRaw = document.getElementById("dutyDateInp").value;
  if (!company || !obj || !act || !dtRaw) {
    toast("Užpildykite visus laukus");
    return;
  }
  var dateStr = dtRaw.replace("T", " ");
  var mgr = dutyMgrEnabled;
  DUTY_LOG.push({
    id: dutyNextId++,
    eng: "Tomas Kazlauskas",
    company: company,
    obj: obj,
    date: dateStr,
    fault: fault,
    action: act,
    mgr: mgr,
    photos: dutyPhotos.slice(),
  });
  dutyPhotos = [];
  renderDuty();
  (function () {
    var _m = document.getElementById("dutyModal");
    if (_m) {
      _m.classList.remove("open");
      _m.style.display = "none";
    }
  })();
  toast("Budėjimo įrašas pridėtas");
});

// SIGNATURE CANVAS
on("sigModalClose", "click", function () {
  (function () {
    var _m = document.getElementById("sigModal");
    if (_m) {
      _m.classList.remove("open");
      _m.style.display = "none";
    }
  })();
});

on("sigClear", "click", function () {
  var canvas = document.getElementById("sigCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

on("sigSave", "click", function () {
  var canvas = document.getElementById("sigCanvas");
  var ctx = canvas.getContext("2d");
  var px = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  var hasContent = false;
  for (var i = 3; i < px.length; i += 4) {
    if (px[i] > 0) {
      hasContent = true;
      break;
    }
  }
  if (!hasContent) {
    toast("Prašome pasirašyti");
    return;
  }
  (function () {
    var _m = document.getElementById("sigModal");
    if (_m) {
      _m.classList.remove("open");
      _m.style.display = "none";
    }
  })();
  // Show saved signature thumbnail in detail
  var sigArea = document.getElementById("sigPreview");
  if (sigArea) {
    sigArea.innerHTML =
      '<div style="display:flex;align-items:center;gap:8px;background:var(--bg3);border-radius:10px;padding:8px 12px;margin-top:8px;">' +
      '<img src="' +
      canvas.toDataURL() +
      '" style="height:36px;border-radius:6px;background:#fff;" />' +
      '<span style="font-size:12px;color:var(--t2);">Parašas išsaugotas</span>' +
      '<button onclick="clearSig()" style="background:none;border:none;color:#DC2626;cursor:pointer;font-size:16px;margin-left:auto;">&#x2715;</button>' +
      "</div>";
  }
  toast("Parašas išsaugotas");
});

function clearSig() {
  var sigArea = document.getElementById("sigPreview");
  if (sigArea) sigArea.innerHTML = "";
}

function initSigCanvas() {
  var canvas = document.getElementById("sigCanvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var drawing = false;
  var lastX, lastY;

  function getPos(e) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  canvas.addEventListener("mousedown", function (e) {
    drawing = true;
    var p = getPos(e);
    lastX = p.x;
    lastY = p.y;
  });
  canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    drawing = true;
    var p = getPos(e);
    lastX = p.x;
    lastY = p.y;
  });
  canvas.addEventListener("mousemove", function (e) {
    if (!drawing) return;
    var p = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = document.body.classList.contains("dark")
      ? "#f1f5f9"
      : "#0f172a";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastX = p.x;
    lastY = p.y;
  });
  canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
    if (!drawing) return;
    var p = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = document.body.classList.contains("dark")
      ? "#f1f5f9"
      : "#0f172a";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastX = p.x;
    lastY = p.y;
  });
  canvas.addEventListener("mouseup", function () {
    drawing = false;
  });
  canvas.addEventListener("touchend", function () {
    drawing = false;
  });
  canvas.addEventListener("mouseleave", function () {
    drawing = false;
  });
}

// Init signature canvas after DOM ready
document.addEventListener("DOMContentLoaded", function () {
  initSigCanvas();
});
// Also init immediately in case DOM is already ready
initSigCanvas();

// INIT - render calendar on load
renderCal();
