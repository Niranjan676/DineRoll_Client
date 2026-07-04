import React from 'react'

function ProductionTable() {
  return (
    <div>
      <hr />
      <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Roll weight</th>
                <th>Roll count</th>
                <th>Consumed weight</th>
                <th>Pending weight</th>
                <th>Update</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>30</td>
                <td>400</td>
                <td><button>Update</button></td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ProductionTable
