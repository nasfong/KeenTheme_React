import { KTSVG } from '../_metronic/helpers'
import { Toolbar1 } from '../_metronic/layout/components/toolbar/Toolbar1'
import { PageTitle } from '../_metronic/layout/core'

function NoPermission() {
  return (<>
    <PageTitle breadcrumbs={[]}>Forbiddon Error</PageTitle>
    <Toolbar1></Toolbar1>
    <div className="alert alert-danger d-flex align-items-center p-5 mb-10">
      <KTSVG className='svg-icon-5x vg-icon-2hx svg-icon-danger me-3' path='/media/icons/duotune/general/gen051.svg' />
      <div className="d-flex flex-column">
        <h4 className="mb-1 text-danger">Forbiddon Error</h4>
        <span>You don't have permission to access on this module.</span>
      </div>
    </div>
  </>)
}

export default NoPermission
