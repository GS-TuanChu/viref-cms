import Swal from 'sweetalert2'

export default {
  methods: {
    successAlert() {
      Swal.fire({
        title: 'Success',
        icon: 'success',
      })
    },
    errorAlert(error) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: error.message ? error.message : error,
      })
    },
  },
}
