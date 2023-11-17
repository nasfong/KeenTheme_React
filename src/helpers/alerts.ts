import Swal from "sweetalert2"

export function alerts(fn: Function) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      fn()
      // Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
    }
  })
}