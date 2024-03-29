<script>
import DatePicker from "vue2-datepicker";
import Switches from "vue-switches";
import Multiselect from "vue-multiselect";
import NumberInputSpinner from "vue-number-input-spinner";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Advanced-form component
 */
export default {
  page: {
    title: "Form Advanced",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    DatePicker,
    Switches,
    Multiselect,
    NumberInputSpinner,
    Layout,
    PageHeader,
    flatPickr,
  },
  data() {
    return {
      title: "Form Advanced",
      items: [
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Advanced",
          active: true,
        },
      ],
      defaultdate: "",
      autoClose: "",
      daterange: "",
      demoMonth: "",
      demoYear: "",
      time: null,
      enabled: false,
      enabled1: false,
      enabled2: false,
      enabled3: false,
      enabled4: false,
      enabled5: false,
      small: false,
      small1: false,
      small2: false,
      small3: false,
      danger: false,
      info: false,
      success: false,
      primary: false,
      secondary: false,
      customColor: false,
      customColor1: false,
      customColor2: false,
      customColor3: false,
      value: null,
      value1: null,
      options: [
        "Alaska",
        "Hawaii",
        "California",
        "Nevada",
        "Oregon",
        "Washington",
        "Arizona",
        "Colorado",
        "Idaho",
        "Montana",
        "Nebraska",
        "New Mexico",
        "North Dakota",
        "Utah",
        "Wyoming",
        "Alabama",
        "Arkansas",
        "Illinois",
        "Iowa",
      ],
      maxlen: "",
      data: "",
      option: "",
      textarea: "",
      defaultNull: null,
      defaultspinval: 1,
      flatpickerSimple: new Date(),
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "Y-m-d",
      },
      datetimepicker: new Date(),
      datetimeconfig: {
        dateFormat: "Y-m-dTH:i",
      },
      humanfriendlydate: new Date(),
      humanFriendlyOption: {
        altInput: true,
        convertModelValue: true,
      },
      disabledOption: {
        onReady: function() {
          this.jumpToDate("2025-01");
        },
        disable: [
          "2025-01-30",
          "2025-02-21",
          "2025-03-08",
          new Date(2025, 4, 9),
        ],
        dateFormat: "Y-m-d",
        defaultDate: new Date(),
      },
      disabledate: new Date(),
      multipleOption: {
        mode: "multiple",
      },
      multipledate: new Date(),
      modeOption: {
        mode: "range",
      },
      modedate: new Date(),
      timepickerOption: {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
      },
      timepicker: new Date(),
    };
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Select2</h4>
            <p class="card-title-desc">
              A mobile and touch friendly input spinner component for Bootstrap
            </p>
            <div class="col-sm-8">
              <label>Single Select</label>
              <multiselect
                v-model="value"
                :options="options"
                class="helo"
              ></multiselect>

              <label class="mt-3">Multiple Select</label>
              <multiselect
                v-model="value1"
                :options="options"
                :multiple="true"
              ></multiselect>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Css Switch</h4>
            <p class="card-title-desc">Here are a few types of switches.</p>

            <switches
              v-model="enabled"
              type-bold="true"
              class="mb-0"
            ></switches>
            <switches
              v-model="enabled1"
              type-bold="false"
              color="warning"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled2"
              type-bold="false"
              color="danger"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled3"
              type-bold="false"
              color="primary"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled4"
              type-bold="false"
              color="success"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled5"
              type-bold="false"
              color="info"
              class="ms-1 mb-0"
            ></switches>
            <h5 class="mt-4 font-size-14 mb-4">Small switch</h5>

            <div>
              <switches v-model="small"></switches>
              <switches
                v-model="small1"
                color="warning"
                class="ms-1"
              ></switches>
              <switches v-model="small2" color="danger" class="ms-1"></switches>
              <switches
                v-model="small3"
                color="success"
                class="ms-1"
              ></switches>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Date Picker</h4>
            <p class="card-title-desc">Examples of bootstrap datepicker.</p>

            <div>
              <div class="form-group mb-3">
                <label>Default Date Picker</label>
                <br />
                <date-picker
                  v-model="defaultdate"
                  :first-day-of-week="1"
                  lang="en"
                  confirm
                ></date-picker>
              </div>

              <div class="form-group mb-3">
                <label>Auto close</label>
                <br />
                <date-picker
                  v-model="autoClose"
                  :first-day-of-week="1"
                  lang="en"
                ></date-picker>
              </div>

              <div class="form-group mb-3">
                <label>Date Range</label>
                <br />
                <date-picker
                  v-model="daterange"
                  range
                  append-to-body
                  lang="en"
                  confirm
                ></date-picker>
              </div>

              <div class="form-group mb-3">
                <label>Month View</label>
                <br />
                <date-picker
                  v-model="demoMonth"
                  type="month"
                  lang="en"
                  confirm
                  placeholder="Select Month"
                ></date-picker>
              </div>

              <div class="form-group mb-3">
                <label>Year View</label>
                <br />
                <date-picker
                  v-model="demoYear"
                  type="year"
                  lang="en"
                  confirm
                  placeholder="Select Year"
                ></date-picker>
              </div>

              <div class="form-group mb-3">
                <label>Time View</label>
                <br />
                <date-picker
                  v-model="time"
                  format="hh:mm:ss a"
                  value-type="format"
                  type="time"
                  placeholder="hh:mm:ss a"
                ></date-picker>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End datepicker -->
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Bootstrap TouchSpin</h4>
            <p class="card-title-desc">
              A mobile and touch friendly input spinner component for Bootstrap
            </p>
            <div class="form-group">
              <label>Using data attributes</label>
              <NumberInputSpinner
                :min="0"
                :max="10"
                :integerOnly="true"
                v-model="defaultspinval"
              />
            </div>

            <div class="form-group">
              <label class="mt-3">Example with postfix</label>
              <NumberInputSpinner
                :min="0.5"
                :max="100.5"
                :step="0.5"
                :value="2.5"
                :integerOnly="false"
              />
            </div>
            <div class="form-group">
              <label class="mt-3">Init with empty value:</label>
              <NumberInputSpinner
                :min="1"
                :max="100"
                :step="1"
                :integerOnly="false"
                v-model="defaultNull"
              />
            </div>
            <div class="form-group">
              <label class="mt-3">Custom step:</label>
              <NumberInputSpinner
                :min="1"
                :max="100"
                :step="2"
                :integerOnly="true"
                :value="4"
              />
            </div>
            <div class="form-group">
              <label class="mt-3">Custom Value:</label>
              <NumberInputSpinner
                :min="-90"
                :max="90"
                :step="1"
                :integerOnly="false"
                :value="-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Bootstrap MaxLength</h4>
            <p class="card-title-desc">
              Uses the HTML5 attribute "maxlength" to work.
            </p>

            <label class="mb-1 fw-medium">Default usage</label>
            <p class="text-muted font-13">
              The badge will show up by default when the remaining chars are 10
              or less:
            </p>
            <input
              v-model="maxlen"
              type="text"
              class="form-control"
              :maxlength="10"
            />
            <div v-if="maxlen" class="text-center">
              <p
                class="badge position-absolute"
                :class="{
                  'bg-success': maxlen.length !== 10,
                  'bg-danger': maxlen.length === 10,
                }"
              >
                {{ maxlen.length }} / 10
              </p>
            </div>

            <div>
              <label class="mb-1 mt-3 fw-medium">Threshold value</label>
              <p class="text-muted font-13">
                Do you want the badge to show up when there are 20 chars or
                less? Use the
                <code>threshold</code>
                option:
              </p>
              <input
                v-model="data"
                type="text"
                :maxlength="25"
                class="form-control"
              />
              <div class="text-center">
                <p
                  v-if="data"
                  class="badge position-absolute"
                  :class="{
                    'bg-success': data.length !== 25,
                    'bg-danger': data.length === 25,
                  }"
                >
                  {{ data.length }} / 25
                </p>
              </div>
            </div>

            <div>
              <label class="mb-1 mt-3 fw-medium">All the options</label>
              <p class="text-muted font-13">
                Please note: if the
                <code>alwaysShow</code> option is enabled, the
                <code>threshold</code> option is ignored.
              </p>
              <input
                v-model="option"
                type="text"
                class="form-control"
                :maxlength="25"
              />
              <div class="text-center">
                <p
                  v-if="option"
                  class="badge position-absolute"
                  :class="{
                    'bg-success': option.length !== 25,
                    'bg-danger': option.length === 25,
                  }"
                >
                  You typed
                  {{ option.length }} out of 25 chars available.
                </p>
              </div>
            </div>

            <div>
              <label class="mb-1 mt-3 fw-medium">Textareas</label>
              <p class="text-muted font-13">
                Bootstrap maxlength supports textarea as well as inputs. Even on
                old IE.
              </p>
              <textarea
                v-model="textarea"
                class="form-control"
                :maxlength="225"
                rows="3"
                placeholder="This textarea has a limit of 225 chars."
              ></textarea>
              <div class="text-center">
                <p
                  v-if="textarea"
                  class="badge position-absolute"
                  :class="{
                    'bg-success': textarea.length !== 225,
                    'bg-danger': textarea.length === 225,
                  }"
                >
                  {{ textarea.length }} / 225
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Flatpickr Datepicker</h4>
            <p class="card-title-desc">
              Flatpickr is a lightweight and powerful datetime picker.
            </p>
            <div class="mb-3">
              <label class="form-label">Basic</label>
              <flat-pickr
                v-model="flatpickerSimple"
                :config="config"
                class="form-control flatpickr-input"
                name="date"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">DateTime</label>
              <flat-pickr
                v-model="datetimepicker"
                :config="datetimeconfig"
                class="form-control"
                name="date"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Human-friendly Dates</label>
              <flat-pickr
                class="form-control flatpickr-input"
                v-model="humanfriendlydate"
                :config="humanFriendlyOption"
              ></flat-pickr>
            </div>

            <div class="mb-3">
              <label class="form-label">Disabling Dates</label>
              <flat-pickr
                class="form-control flatpickr-input"
                v-model="disabledate"
                :config="disabledOption"
              ></flat-pickr>
            </div>

            <div class="mb-3">
              <label class="form-label">Selecting multiple dates</label>
              <flat-pickr
                class="form-control flatpickr-input"
                v-model="multipledate"
                :config="multipleOption"
              ></flat-pickr>
            </div>
            <div class="mb-3">
              <label class="form-label">Range</label>
              <flat-pickr
                class="form-control flatpickr-input"
                v-model="modedate"
                :config="modeOption"
              ></flat-pickr>
            </div>

            <div class="mb-3">
              <label class="form-label">Timepicker</label>
              <flat-pickr
                class="form-control flatpickr-input"
                v-model="timepicker"
                :config="timepickerOption"
              ></flat-pickr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
