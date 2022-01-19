import React, {useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";

interface country {
    id_country: number,
    name: string,
}

interface city {
    id_city: number,
    id_region: number,
    name: string,
}

interface street {
    id_street: number,
    id_area: number,
    name: string
}

interface address {
    id_number: number,
    number: number,
}

const AddressForm = () => {

    const [country, setCountry] = useState('');
    const [theCountry, setTheCountry] = useState<country | null>()
    const [countries, setCountries] = useState<country[]>([])

    // const checkCountry = (event: React.FormEvent<HTMLInputElement>) => {
    //     const name = event.currentTarget.value;
    const checkCountry = (name: string | null) => {
        // const name = event.currentTarget.value;
        if(!name) name = '';
        console.log("name", name)
        setCountry(name)
        fetch(`http://localhost:3000/api/address/${name}`)
            .then((response) => {
                    response.json().then((data) => {
                        let c = data as country[]
                        setCountries(c);
                        if (countries.length !== 0) {
                            setTheCountry(countries[0]);
                        } else {
                            setTheCountry(null)
                        }
                    })
                }
            )
    }

    const [city, setCity] = useState('')
    const [theCity, setTheCity] = useState<city | null>(null);
    const [cities, setCities] = useState<city[]>([])

    // const checkCity = (event: React.FormEvent<HTMLInputElement>) => {
    //     const name = event.currentTarget.value;
    const checkCity = (name : string) =>
    {
        setCity(name)
        if (!theCountry) return;
        fetch(`http://localhost:3000/api/address/${theCountry.id_country}/${name}`)
            .then((response) => {
                    response.json().then((data) => {
                        let c = data as city[]
                        setCities(c)
                        console.log(cities)
                        if (cities.length !== 0) {
                            setTheCity(cities.reduce((a, b) => a.name.length <= b.name.length ? a : b));
                        } else {
                            setTheCity(null)
                        }
                    })
                }
            )
    }

    const [street, setStreet] = useState('')
    const [theStreet, setTheStreet] = useState<street | null>(null)
    const [streets, setStreets] = useState<street[]>([])

    // const checkStreet = (event: React.FormEvent<HTMLInputElement>) => {
    //     const name = event.currentTarget.value;
    const checkStreet = (name : string) => {
        setStreet(name)
        if (!theCountry) return;
        if (!theCity) return;
        fetch(`http://localhost:3000/api/address/${theCountry.id_country}/${theCity.id_city}/${name}`)
            .then((response) => {
                    response.json().then((data) => {
                        let s = data as street[]
                        setStreets(s)
                        if (streets.length !== 0) {
                            setTheStreet(streets.reduce((a, b) => a.name.length <= b.name.length ? a : b));
                        } else {
                            setTheStreet(null)
                        }
                    })
                }
            )
    }

    const [address, setAddress] = useState('')
    const [theAddress, setTheAddress] = useState<address | null>(null);

    const checkAddress = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.value;
        setAddress(name)
        if (!theCountry) return;
        if (!theCity) return;
        if (!theStreet) return;
        fetch(`http://localhost:3000/api/address/${theCountry.id_country}/${theCity.id_city}/${theStreet.id_street}/${name}`)
            .then((response) => {
                    response.json().then((data) => {
                        let addresses = data as address[]
                        if (address.length === 1) {
                            setTheAddress(addresses[0]);
                        } else {
                            setTheAddress(null)
                        }
                    })
                }
            )
    }

    return (
        <div>
            <Autocomplete
                inputValue={country}
                onInputChange={(event, newInputValue) => {
                    checkCountry(newInputValue);
                }}
                id="controllable-states-demo"
                options={countries.map((country) => country.name)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Country" />}
            />
            {/*<label>*/}
            {/*<input value={country} onChange={checkCountry}/>*/}
            {/*     - country*/}
            {/*</label>*/}
            {theCountry ? <div>
                <Autocomplete
                    value={city}
                    onChange={(event: any, newValue: string | null) => {
                        if(newValue)
                        checkCity(newValue);
                    }}
                    inputValue={city}
                    onInputChange={(event, newInputValue) => {
                        checkCity(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={cities.map((city) => city.name)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="City" />}
                />
                {/*<label>*/}
                {/*<input value={city} onChange={checkCity}/>*/}
                {/*- city</label>*/}
                {theCity ? <div>
                    {/*<label>*/}
                    {/*<input value={street} onChange={checkStreet}/>*/}
                    {/*- street</label>*/}
                    <Autocomplete
                        inputValue={street}
                        onInputChange={(event, newInputValue) => {
                            checkStreet(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={streets.map((street) => street.name)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Street" />}
                    />
                    {theStreet ? <div>
                        <label>
                        <input value={address} onChange={checkAddress}/>
                        - number</label>
                        {theAddress ? <div>
                            <p>Your address
                                is: {theCountry.name}, {theCity.name} ul. {theStreet.name} {theAddress.number}</p>
                        </div> : <p>waiting for input</p>}
                    </div> : <p>waiting for input</p>}
                </div> : <p>waiting for input</p>}
            </div> : <p>Waiting for input</p>}
        </div>
    )
}

export default AddressForm;