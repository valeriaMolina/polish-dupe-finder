<template>
  <div id="gradient-bg" class="d-flex flex-column align-items-center px-3 py-5">
    <div class="header-area">
      <h1>Submit a dupe</h1>
    </div>
    <div class="border shadow rounded px-4 py-4 white-bg">
      <div class="submission-guidelines">
        <h2>Submission Guidelines</h2>
        <p>Before submitting a dupe, please make sure:</p>
        <ul>
          <li>The two polishes you want to link already exist in our database.</li>
          <li>
            The two polishes you are linking are similar enough to be substituted for each other to
            achieve the same look.
          </li>
        </ul>
      </div>
      <hr />
      <div>
        <form action="" @submit.prevent="submit">
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <h3>Select first polish:</h3>
            <b>What's the brand name?</b>
            <AutoCompletion
              v-if="!firstBrand"
              :suggestions="brands"
              :onSelect="selectFirstBrandName"
            ></AutoCompletion>
            <Selection
              v-if="firstBrand"
              :text="firstBrand.name"
              @remove-selection-click="removeFirstBrandSelection"
            ></Selection>
          </div>
          <div v-if="firstBrand" class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <b>What's the name of the nail polish?</b>
            <AutoCompletion
              v-if="firstBrand && !firstPolish"
              :suggestions="firstBrandPolishes"
              :onSelect="selectFirstPolish"
            ></AutoCompletion>
            <Selection
              v-if="firstPolish"
              :text="firstPolish.name"
              @remove-selection-click="removeFirstPolishSelection"
            ></Selection>
          </div>

          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <h3>Select second polish:</h3>
            <b>What's the brand name?</b>
            <AutoCompletion
              v-if="!secondBrand"
              :suggestions="brands"
              :onSelect="selectSecondBrandName"
            ></AutoCompletion>
            <Selection
              v-if="secondBrand"
              :text="secondBrand.name"
              @remove-selection-click="removeSecondBrandSelection"
            ></Selection>
          </div>
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group" v-if="secondBrand">
            <b>What's the name of the nail polish?</b>
            <AutoCompletion
              v-if="secondBrand && !secondPolish"
              :suggestions="secondBrandPolishes"
              :onSelect="selectSecondPolish"
            ></AutoCompletion>
            <Selection
              v-if="secondPolish"
              :text="secondPolish.name"
              @remove-selection-click="removeSecondPolishSelection"
            ></Selection>
          </div>
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <button type="submit" class="btn btn-primary" :disabled="isSubmitDisabled">
              Submit Dupe
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import AutoCompletion from '@/components/AutoCompletion.vue'
import Selection from '@/components/Selection.vue'
import { fetchBrands } from '@/apis/brandAPI'
import { getPolishesByBrandId } from '@/apis/polishAPI'
import { submitDupe } from '@/apis/submissionsAPI'

const brands = ref([])
// first polish
const firstBrand = ref(null)
const firstBrandPolishes = ref([])
const firstPolish = ref(null)
// second polish
const secondBrand = ref(null)
const secondBrandPolishes = ref([])
const secondPolish = ref(null)

const isSubmitDisabled = computed(() => {
  return !firstPolish.value || !secondPolish.value
})

const submit = async () => {
  const res = await submitDupe(firstPolish.polish_id, secondPolish.polish_id)
  console.log(res)
}

const selectFirstBrandName = async (brand) => {
  firstBrand.value = brand
  // call the polish API to get all polishes associated with this brand
  firstBrandPolishes.value = await getPolishesByBrandId(brand.brand_id, 1, 1000).then(
    (obj) => obj.rows
  )
}

const removeFirstBrandSelection = () => {
  firstBrand.value = null
  firstPolish.value = null
}

const removeFirstPolishSelection = () => {
  firstPolish.value = null
}

const selectFirstPolish = (polish) => {
  firstPolish.value = polish
}

const selectSecondBrandName = async (brand) => {
  secondBrand.value = brand
  // call the polish API to get all polishes associated with this brand
  secondBrandPolishes.value = await getPolishesByBrandId(brand.brand_id, 1, 1000).then(
    (obj) => obj.rows
  )
}

const removeSecondBrandSelection = () => {
  secondBrand.value = null
  secondPolish.value = null
}

const removeSecondPolishSelection = () => {
  secondPolish.value = null
}

const selectSecondPolish = (polish) => {
  secondPolish.value = polish
}

onMounted(async () => {
  const fetchedBrands = await fetchBrands()
  brands.value = fetchedBrands
})
</script>

<style>
#gradient-bg {
  background: radial-gradient(circle at 11.4% 50%, rgb(255, 37, 174) 0%, rgb(250, 237, 56) 90%);
}

.white-bg {
  background-color: #ececec;
  color: black;
}
</style>
