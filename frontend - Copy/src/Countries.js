import React from 'react'
import Country from './Country'

function Countries({countries}) {

  return (
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Modify Customer</th> // where you'll put the edit button
            </tr>
          </thead>
          <tbody>
            {/* iterate through the customers array and render a unique Customer component for each customer object in the array */}
            { countries.map(country => <Country key={country.csem_id} country={country} />) }
          </tbody>
        </table>
  )
}

export default Countries