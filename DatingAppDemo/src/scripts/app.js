profiles = [
    {
        name: "anvesh",
        age: 22,
        gender: "male",
        Lookingfor: 'female',
        location: 'Redlakunta',
        image: "https://randomuser.me/api/portraits/med/men/75.jpg"
    },
    {
        name: "ganesh",
        age: 22,
        gender: "male",
        Lookingfor: 'female',
        location: 'Redlakunta',
        image: "https://randomuser.me/api/portraits/thumb/women/75.jpg"
    },
    {
        name: "chandu",
        age: 22,
        gender: "male",
        Lookingfor: 'female',
        location: 'Redlakunta',
        image: "https://randomuser.me/api/portraits/thumb/women/74.jpg"
    },
    {
        name: "dasta",
        age: 22,
        gender: "male",
        Lookingfor: 'female',
        location: 'america',
        image: "https://randomuser.me/api/portraits/thumb/women/74.jpg"
    }
]

const profilesITR = profileIterator(profiles);
nextProfileDisplay();

function nextProfileDisplay() {
    const profile = profilesITR.next().value;
    if (profile !== undefined) {


        document.getElementById('profiledisplay').innerHTML = `
    <ul class="list-group">
        <li class="list-group-item">Name: ${profile.name}</li>
        <li class="list-group-item">age: ${profile.age}</li>
        <li class="list-group-item">gender: ${profile.gender}</li>
        <li class="list-group-item">Looking for: ${profile.Lookingfor}</li>
        <li class="list-group-item">location: ${profile.location}</li>
    </ul>`;
        document.getElementById('imagedisplay').innerHTML = `
    <img src="${profile.image}">`;
    } else {
        window.location.reload();
    }

}

document.getElementById('next').addEventListener('click', nextProfileDisplay)

function profileIterator(profiles) {
    let nextIndex = 0;
    return {
        next: function () {
            return nextIndex < profiles.length ?
                {value: profiles[nextIndex++], done: false} :
                {done: true};
        }
    }
}