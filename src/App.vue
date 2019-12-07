<template>
  <div id="app">
    <div class="row mt-2 ml-0 mr-0">
      <div class="input-group col-12 mb-2">
        <div class="input-group-prepend">
          <span class="input-group-text">Customer</span>
        </div>
        <input type="text" v-model="userData.customer" placeholder="Name" class="form-control">
      </div>
      <div class="input-group col-12 mb-2">
        <div class="input-group-prepend">
          <span class="input-group-text">Address 1</span>
        </div>
        <input
          type="text"
          v-model="userData.address1"
          placeholder="Street Address"
          class="form-control"
        >
      </div>
      <div class="input-group col-12 mb-2">
        <div class="input-group-prepend">
          <span class="input-group-text">Address 2</span>
        </div>
        <input
          type="text"
          v-model="userData.address2"
          placeholder="City, State, Zip"
          class="form-control"
        >
      </div>
      <div class="custom-control custom-radio ml-3">
        <input
          type="radio"
          class="custom-control-input"
          id="contract"
          name="billing"
          value="contract"
          v-model="userData.billing"
        >
        <label class="custom-control-label" for="contract">Contract</label>
      </div>
      <div class="custom-control custom-radio ml-3">
        <input
          type="radio"
          class="custom-control-input"
          id="tm"
          name="billing"
          value="tm"
          v-model="userData.billing"
        >
        <label class="custom-control-label" for="tm">Time & Material</label>
      </div>
    </div>

    <br>

    <!--Worker card group -->
    <div class="row ml-3">
      <div class="col12">
        <h3>Workers</h3>
      </div>
    </div>
    <div class="card mb-2 ml-3" style="width: 18rem;" v-for="(workerRow,index) in workerRows">
      <div>
          <p>{{index}}</p>
      </div>
      <div class="card-body">
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text">Name</span>
          </div>
          <input type="text" class="form-control" v-model="workerRow.name" placeholder="Name">
        </div>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text">Class</span>
          </div>
          <input type="text" class="form-control" v-model="workerRow.class" placeholder="Class">
        </div>
        <div class="mb-2 ml-4">
          <input type="checkbox" class="form-check-input" v-model="workerRow.travel">
          <label class="form-check-label">Travel</label>
        </div>
        <div class="mb-2 ml-4">
          <input type="checkbox" class="form-check-input" v-model="workerRow.perdiem">
          <label class="form-check-label">Per Diem</label>
        </div>

      </div>
    </div>
    <div class="row ml-0">
      <div class="col-12">
        <button @click="addWorkerRow" class="btn btn-outline-primary" style="cursor: pointer">+</button>
        <button
          @click="removeWorkerRow(index);"
          class="btn btn-outline-secondary ml-2"
          style="cursor: pointer"
        >-</button>
      </div>
    </div>

    <br>

    <!--Equipment card group-->
    <div class="row ml-3">
      <div class="col12">
        <h3>Equipment</h3>
      </div>
    </div>
    <div class="card mb-2 ml-3" style="width: 18rem;" v-for="(equipRow,index) in equipRows">
      <div>
          <p>{{index}}</p>
      </div>
      <div class="card-body">
        <div class="mb-2">
          <select v-model="equipRow.equip" name="equipment" class="browser-default custom-select">
            <option value selected disabled hidden>---Select Equipment---</option>
            <option value="Truck & Tools">Truck & Tools</option>
            <option value="Backhoe">Backhoe</option>
            <option value="Drill Rig - Tool Truck">Drill Rig - Tool Truck</option>
            <option value="Drill Rig (Foundation)">Drill Rig (Foundation)</option>
            <option value="Dump Truck (Bobtail)">Dump Truck (Bobtail)</option>
            <option value="Dump Truck (Super 10)">Dump Truck (Super 10)</option>
            <option value="Well - Tool Truck">Well - Tool Truck</option>
            <option value="Well - Drill / Wtr Trk / Mud">Well - Drill / Wtr Trk / Mud</option>
            <option value="Skid Steer">Skid Steer</option>
            <option value="Mini-Excavator">Mini-Excavator</option>
            <option value="Skip Loader">Skip Loader</option>
            <option value="Compactor (Upright)">Compactor (Upright)</option>
            <option value="Compactor (Ride-on)">Compactor (Ride-on)</option>
            <option value="Compressor Truck (Demo)">Compressor Truck (Demo)</option>
            <option value="Compressor (Towable)">Compressor (Towable)</option>
            <option value="Forklift (Reach) 5K">Forklift (Reach) 5K</option>
            <option value="Forklift (Reach) 10K">Forklift (Reach) 10K</option>
            <option value="Forklift (Warehouse)">Forklift (Warehouse)</option>
            <option value="Generator / Welder">Generator / Welder</option>
            <option value="Scissor Lift">Scissor Lift</option>
            <option value="Trencher (Ride-on)">Trencher (Ride-on)</option>
            <option value="Trencher (Walk Behind)">Trencher (Walk Behind)</option>
            <option value="Water Trailer">Water Trailer</option>
            <option value="Water Truck (2000 gal.)">Water Truck (2000 gal.)</option>
            <option value="Development Rig">Development Rig</option>
            <option value="Rail Rig">Rail Rig</option>
            <option value="Welding Truck">Welding Truck</option>
            <option value="Compressor (Small)">Compressor (Small)</option>
            <option value="P&D (Portal to Portal)">P&D (Portal to Portal)</option>
          </select>
        </div>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text">#</span>
          </div>
          <input
            type="number"
            class="form-control"
            v-model="equipRow.equipNo"
            placeholder="Equipment Number"
          >
        </div>
        <div class="input-group mb-2">
          <input type="number" class="form-control" v-model="equipRow.hrs" placeholder="Hours Used">
          <div class="input-group-append">
            <span class="input-group-text">Hrs</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row ml-0">
      <div class="col-12">
        <button @click="addEquipRow" class="btn btn-outline-primary" style="cursor: pointer">+</button>
        <button
          @click="removeEquipRow(index);"
          class="btn btn-outline-secondary ml-2"
          style="cursor: pointer"
        >-</button>
      </div>
    </div>

    <br>

    <!--Signature box-->
    <div class="row ml-0 mr-0">
      <div class="col-12">
        <h3>Customer Signature</h3>
        <VueSignaturePad id="signature" width="100%" height="150px" ref="signaturePad"/>
      </div>
      <div class="col-9 mt-2">
        <button class="btn btn-block btn-primary" @click="submitForm">Save</button>
      </div>
      <div class="col-3 mt-2">
        <button class="btn btn-block btn-outline-secondary" @click="clear">Clear</button>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import axios from "axios";
//var rows = 1;
//var workerRows = 1;

export default {
  name: "App",
  data() {
    return {
      userData: {
        name: "",
        email: "",
        billing: ""
      },
      savedPNG: "",
      equipRows: [],
      workerRows: []
    };
  },
  methods: {
    clear() {
      this.$refs.signaturePad.clearSignature();
    },
    addEquipRow() {
      //var elem = document.createElement("tr");
      //rows += 1;
      this.equipRows.push({
        equip: "",
        equipNo: "",
        hrs: ""
      });
    },
    addWorkerRow() {
      //workerRows += 1;
      this.workerRows.push({
        travel: "",
        perdiem: "",
        name: "",
        class: "",
        hrs: ""
      });
    },
    submitForm() {
      console.log(this.workerRows);
      let { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      this.savedPNG = data;
      let RowData = this.rows;
      axios
        .post("http://corp.kgcinc.com:3000/api/v1/posts", {
          body: {
            userData: {
              customer: this.userData.customer,
              address1: this.userData.address1,
              address2: this.userData.address2,
              billing: this.userData.billing
            },
            InputData: {
              EquipmentRowInfo: RowData,
              WorkerRowInfo: WorkerData,
              Signature: data
            }
          }
        })
        .then(response => {
          alert("Form received.  Thank you!");
        })
        .catch(error => {
          alert(error);
        });
    },
    removeEquipRow(index) {
      this.equipRows.splice(index, 1);
      equipRows = -1;
    },
    removeWorkerRow(index) {
      this.workerRows.splice(index, 1);
      workerRows = -1;
    }

    // submitForm: async function() {
    //     // save signature
    //     const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
    //     this.savedPNG = data
    //     // fetch params init
    //     const { name, email, savedPNG } = this
    //     const opts = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ name, email, savedPNG })
    //     }

    //     //fetch
    //     const response = await fetch('http://localhost:3000/form_submit', opts)
    //     if (response.ok){
    //       const data = await response.json()
    //       alert("Form received.  Thank you!");
    //     } else {
    //       throw Error(response.statusText){
    //       alert(Error);
    //     }

    //     //clear all fields
    //     this.$refs.signaturePad.clearSignature()
    //     this.name = ''
    //     this.email = ''
    //     this.savedPNG = ''

    // }
  }
};
</script>

<style>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
