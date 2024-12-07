<template>
    <!-- <div id="main-div-polish-submit" class="d-flex flex-column align-items-center px-3 py-5">
        <div class="header-area">
            <h1>Submit a Nail Polish</h1>
        </div>
        <div id="form-register" class="border shadow rounded px-4 py-4">
            <div class="submission-guidelines">
                <h4>Submission Guidelines</h4>
                <p>Before submitting a new nail polish, please make sure:</p>
                <ul>
                    <li>
                        The polish is not already in our database. You can search for existing
                        polishes
                        <a href="">here</a>
                        
                    </li>
                    <li>
                        You provide as much information as possible to help us accurately add the
                        polish
                    </li>
                </ul>
            </div>
            <div class="submit-polish-form">
                <form action="" @submit.prevent="send">
                    <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
                        <label for="">Polish Name</label>
                        <small>Enter the full name of the nail polish</small>
                        <input type="text" placeholder="name" required />
                    </div>
                    <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
                        <label for="">Brand</label>
                        <small
                            >Select the brand from our list or <a href="">submit a new brand</a> if
                            it's not listed</small
                        >
                        <select>
                            <option>Please select a brand</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                    </div>
                    <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
                        <label for="">Type</label>
                        <small>Select the type of polish (lacquer or gel)</small>
                        <select name="" id="">
                            <option value="">Select a type</option>
                            <option value="">Lacquer</option>
                            <option value="">Gel</option>
                        </select>
                    </div>
                    <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
                        <label for="Primary Color">Primary Color</label>
                        <small
                            >Select the main color of the polish.
                            <a href="">What does this mean?</a></small
                        >
                        <select name="" id="">
                            <option value="">Choose a primary color</option>
                            <option value="">Red</option>
                        </select>
                    </div>
                    <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
                        <label for="">Effect Colors</label>
                        <small>List any secondary colors (optional)</small>
                        <select name="" id="">
                            <option value="">Choose secondary colors</option>
                        </select>
                    </div>
                    <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
                        <label for="">Formulas</label>
                        <small>List the formulas (e.g. glitter, creme, holographic).</small>
                        <select name="" id="">
                            Choose a formula
                        </select>
                    </div>
                    <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
                        <label for="">Description</label>
                        <small>Tell us a little bit about the polish. What makes it unique?</small>
                        <input type="text" placeholder="description" />
                    </div>
                    <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
                        <label for="">Upload a picture</label>
                        <small>Upload a clear picture of the polish</small>
                        <input type="file" />
                    </div>
                    <div>
                        <button
                            id="override-btn"
                            class="mx-2 btn-style501 btn"
                            type="submit"
                            :disabled="disable"
                        >
                            <span class="spinner-border spinner-border-sm" :hidden="hiddenSpinner">
                            </span>
                            Submit Polish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div> -->
    <div id="main-div-polish-submit" class="d-flex flex-column align-items-center px-3 py-5">
        <AlreadyInDB ref="alreadyInDb"></AlreadyInDB>
        <NotLoggedInModal ref="thisModal"></NotLoggedInModal>
        <SubmissionAlreadyExists ref="subAlreadyExists"></SubmissionAlreadyExists>
        <SubmissionSuccessModal ref="successModal"></SubmissionSuccessModal>
        <ErrorModal ref="errorModal"></ErrorModal>
        <div class="container-fluid row justify-content-md-center">
            <div class="col-6 pt-2">
                <form id="form-register" class="border shadow rounded px-1 py-4" novalidate>
                    <div class="my-3 px-5 text-center">
                        <h2>Submit a new polish</h2>
                    </div>
                    <div class="my-4 px-4">
                        <h4>Submission Guidelines</h4>
                        <p>Before submitting a new nail polish, please make sure:</p>
                        <ul>
                            <li>
                                The polish is not already in our database. You can search for
                                existing polishes
                                <a href="">here.</a>
                            </li>
                            <li>
                                You provide as much information as possible to help us accurately
                                add the polish.
                            </li>
                            <li>
                                The brand is already in our database. You can search for existing
                                brands here!
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2" id="polish-name-div">
                        <label
                            for="polish-name"
                            class="form-label custom-label-size"
                            id="polish-name-label"
                            >Name of the polish</label
                        >
                        <input
                            type="text"
                            class="custom-input"
                            id="polish-name"
                            @focus="focus('polish-name-div')"
                            @blur="blur('polish-name-div')"
                            required
                        />
                        <small>Enter the full name of the polish</small>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2">
                        <small>Choose a brand</small>
                        <AutoCompletion
                            v-if="!brandName"
                            :suggestions="brands"
                            :onSelect="selectBrand"
                            placeholder="Choose a brand"
                        ></AutoCompletion>
                        <Selection
                            v-if="brandName"
                            :text="brandName"
                            @remove-selection-click="removeBrand"
                        ></Selection>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2">
                        <select
                            class="custom-input"
                            id="polish-type"
                            @focus="focus('polish-type-div')"
                            @blur="blur('polish-type-div')"
                        >
                            <option value="">Select a type</option>
                            <option value="lacquer">Lacquer</option>
                            <option value="gel">Gel</option>
                        </select>
                        <small>Select the type of polish (lacquer or gel)</small>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2">
                        <small>Select a primary color</small>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import AlreadyInDB from '@/components/modals/AlreadyInDB.vue';
import AutoCompletion from '@/components/AutoCompletion.vue';
import Selection from '@/components/Selection.vue';
import NotLoggedInModal from '@/components/modals/NotLoggedInModal.vue';
import SubmissionAlreadyExists from '@/components/modals/SubmissionAlreadyExists.vue';
import SubmissionSuccessModal from '@/components/modals/SubmissionSuccessModal.vue';
import ErrorModal from '@/components/modals/ErrorModal.vue';

import { useAuthStore } from '@/stores/auth';
import { fetchBrands } from '@/apis/brandAPI';

import { ref, onMounted } from 'vue';

const authStore = useAuthStore();
const disable = ref(false);
const hiddenSpinner = ref(true);
const brands = ref([]);

// input fields
const brandName = ref('');

onMounted(async () => {
    // check if user is logged in
    if (!authStore.getIsLoggedIn) {
        showModal();
    } else {
        // fetch brands from API
        const fetchedBrands = await fetchBrands();
        brands.value = fetchedBrands;
    }
});

const send = async () => {
    console.log('Submitting...');
    disable.value = true;
    hiddenSpinner.value = false;
};

const focus = (divId) => {
    const div = document.getElementById(divId);
    const label = div.getElementsByTagName('label')[0];
    const input = div.getElementsByTagName('input')[0];
    input.style.borderBottom = '2px solid #212529';
    label.classList.add('custom-focus');
};

const blur = (divId) => {
    const div = document.getElementById(divId);
    const label = div.getElementsByTagName('label')[0];
    const input = div.getElementsByTagName('input')[0];
    const span = div.getElementsByTagName('small')[0];
    // check for input
    if (input.value.trim() === '') {
        label.classList.remove('custom-focus');
    }
    // check the validity of the input
    if (!input.checkValidity()) {
        input.style.borderBottom = '2px solid red';
        span.style.color = 'red';
    } else {
        input.style.borderBottom = '2px solid green';
        span.style.color = 'green';
    }
};

const reset = (divId) => {
    const div = document.getElementById(divId);
    const label = div.getElementsByTagName('label')[0];
    const input = div.getElementsByTagName('input')[0];
    const span = div.getElementsByTagName('small')[0];
    label.classList.remove('custom-focus');
    input.style.borderBottom = '2px solid #c0c0c0';
    span.style.color = 'black';
};

function showModal() {
    thisModal.value.show();
}

function displaySuccessModal() {
    successModal.value.show();
}

function displayErrorModal() {
    errorModal.value.show();
}

function displayAlreadyExistsModal() {
    subAlreadyExists.value.show();
}

function displayAlreadyExistsInDbModal() {
    alreadyInDb.value.show();
}

const selectBrand = async (brand) => {
    brandName.value = brand.name;
};

const removeBrand = () => {
    brandName.value = null;
};
</script>

<style scoped>
@import url('../../../node_modules/nice-forms.css/dist/nice-forms.css');

label {
    position: absolute;
    transition: all 0.2s ease-in-out 0s;
    transform: translate3d(1px, 4px, 0px);
    font-size: medium;
    z-index: 1;
}

#main-div-polish-submit {
    background: linear-gradient(
        113.5deg,
        rgb(234, 234, 234) 22.3%,
        rgb(201, 234, 211) 56.6%,
        rgb(255, 180, 189) 90.9%
    );
}

#form-register {
    background-color: #ececec;
    color: black;
}

#override-btn:active {
    border-color: #a145ed;
    box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
}

.custom-input {
    padding-bottom: 10px;
    border: none;
    outline: none;
    border-bottom: 2px solid #c0c0c0;
    background-color: #ececec;
}
.custom-input:focus {
    border-bottom: 2px solid #8c92ac;
}

.custom-focus {
    position: absolute;
    transition: all 0.2s ease-in-out 0s;
    transform: translate3d(1px, -12px, 0px);
    font-size: 0.77rem;
    z-index: 1;
}
</style>
