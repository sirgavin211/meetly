const STORAGE_KEY = "userProfile";

let profile = null;
const listeners = new Set();

/* ---------- internal ---------- */
function createDefaultProfile(){
    return {
        first_name: "Guest",
        last_name: "",
        age: null,
        hasFamily: false,
        family: {
            children:[],
            adults:[]
        }
    }
}


function load() {
  if (profile !== null) return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    profile = stored ? JSON.parse(stored) : createDefaultProfile();
  } catch {
    profile = createDefaultProfile();
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function notify() {
  listeners.forEach(fn => fn(profile));
}

export function getProfile() {
  load();
  return profile;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}



/* ---------- public API ---------- */


export function updateFirstName(value){
    load();
    profile.first_name = value;
    save();
    notify();
}

export function updateLastName(value){
    load();
    profile.last_name = value;
    save();
    notify();
}

export function updateAge(value){
    load();
    profile.age = value;
    save();
    notify();
}

export function updateHasFamily(value) {
  load();
  profile.hasFamily = value;
  save();
  notify();
}


export function addChild(child) {
  load();
  profile.family.children = [
    ...profile.family.children,
    child
  ];
  save();
  notify();
  return profile.family.children;
}

export function removeChild(index) {
  load();
  profile.family.children = profile.family.children.filter(
    (_, i) => i !== index
  );
  save();
  notify();
  return profile.family.children;
}

export function addAdult(adult) {
  load();
  profile.family.adults = [
    ...profile.family.adults,
    adult
  ];
  save();
  notify();
  return profile.family.adults;
}

export function removeAdult(index){
  load();
  profile.family.adults = profile.family.adults.filter(
    (_, i) => i !== index
  );
  save();
  notify();
  return profile.family.adults;
}

export function updateChild(index, value){
  load();

  profile.family.children = profile.family.children.map((child, i) =>
    i === index ? value : child
  );

  save();
  notify();

  return profile.family.children;
}

export function updateAdult(index, value){
  load();

  profile.family.adults = profile.family.adults.map((adult, i) =>
    i === index ? value : adult
  );

  save();
  notify();

  return profile.family.adults;
}