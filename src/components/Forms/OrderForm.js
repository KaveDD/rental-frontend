import React , {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import FormHelperText from '@mui/material/FormHelperText';


function OrderForm({order_id , formvalues , btnText}) {

    const history = useHistory();

    const [values, setValues] = useState({
        pickupLocation :'',
        pickupDate: null,
        pickupTime : null ,
        returnDate : null ,
        returnTime : null ,
        vehicleType : '',
        packageType : '', 
      });

      const [ validationErr , setValidationErr ] = useState(null) 

      const [numOfDays , setNumOfdays] = useState(undefined)
    
      const handleChange = (field , newValue) => {
        setValues({ ...values, [field] : newValue });
      };

      const handleSubmit = async () => {

        const { pickupLocation, pickupDate, pickupTime, returnDate, returnTime, vehicleType, packageType } = values

        if( !pickupLocation || !pickupDate || !pickupTime || !returnDate || !returnTime || !vehicleType || !packageType ){
            setValidationErr('All the fields are required.')
            return
        }

        setValidationErr(null)


          if(order_id) {

            try {
                const updateRes =  await fetch(`http://localhost:8092/api/orders/${order_id}`, {
                    method : 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(formattedValues) 
                })
              
                history.goBack();

            } catch (error) {
                console.log(error)
            }
            

          }else{ 

                try {

                    const createRes =  await fetch(`http://localhost:8092/api/orders/create`, {
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(formattedValues) 
                })

                if(createRes.status === 400) {

                    const parseRes = await createRes.json()
                    console.log(parseRes)
                    alert(parseRes.error)

                }else{
                    setValues({
                        pickupLocation :'',
                        pickupDate: null,
                        pickupTime : null ,
                        returnDate : null ,
                        returnTime : null ,
                        vehicleType : '',
                        packageType : '', 
                    })
                }
                    
            } catch (error) {
                console.log(error)
                setValidationErr("Backend Error")
            }

          }
          
      }



      const [formattedValues , setFormattedValues] = useState({
          pickupLocation: '',
          pickupDate : '',
          returnDate : '',
          vehicleType : '',
          packageType : ''
      })

    useEffect(() => {
        if(formvalues) {
            setValues(formvalues)
        }
    } , [formvalues])

    useEffect(() => {
        
        const { pickupDate , pickupTime , returnDate, returnTime , pickupLocation , vehicleType , packageType } = values

        let pickupDateTime;
        let returnDateTime;
        
        if(pickupDate && pickupTime) {

            try {
                const date = pickupDate.toLocaleDateString()
                const time =  pickupTime.toLocaleTimeString()
                pickupDateTime = (new Date(`${date} , ${time}`)).toISOString()   
            } catch (error) {
                console.log(error)
            }
        }

        if(returnDate && returnTime) {
            try {
                const date = returnDate.toLocaleDateString()
                const time =  returnTime.toLocaleTimeString()
                returnDateTime = (new Date(`${date} , ${time}`)).toISOString() 
            } catch (error) {
                console.log(error)
            }
            
        }

        if(pickupDateTime && returnDateTime ) {
            // To calculate the time difference of two dates
            var Difference_In_Time = (new Date(returnDateTime)).getTime() - (new Date(pickupDateTime)).getTime();
            
            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            setNumOfdays( Math.round(parseFloat(Difference_In_Days)))
        }

        setFormattedValues({
            pickupLocation,
            pickupDate: pickupDateTime,
            returnDate : returnDateTime,
            vehicleType,
            packageType
        })

    }, [values])

    return (
        <div>
            <Card variant="outlined">
            <CardContent> 
            <Typography variant="h4" gutterBottom component="div" sx={{ textAlign: 'center' , mb : 5}}>
                {!order_id ? "Create Order" : `Update Order`}
            </Typography>              
                <Box sx={{ mb : 3}}>
                    <Typography gutterBottom component="div" sx={{ mx: 1, width: '60ch' , fontWeight: '600'}}>
                        PICKUP LOCATION
                    </Typography>
                    <TextField id="outlined-basic" variant="outlined"  value={values.pickupLocation} size="small" sx={{ m: 1, width: '60ch' }} onChange={
                        (event) => {
                            handleChange('pickupLocation' , event.target.value)
                        }
                    }/>
                </Box>
                <Box sx={{
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    rowGap : 3
                }}>
                    <div >
                        <Typography gutterBottom component="div" sx={{ mx: 1, width: '60ch' , fontWeight: '600'}}>
                            Pickup Date
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={values.pickupDate}
                                maxDate={values.returnDate}
                                onChange={(newValue) => {
                                    handleChange('pickupDate', newValue)
                                }}
                                renderInput={(params) => <TextField size='small' sx={{ m: 1, width: '60ch' }} {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div >
                        <Typography gutterBottom component="div" sx={{ mx: 1, width: '60ch' , fontWeight: '600'}}>
                            Pickup Time
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                value={values.pickupTime}
                                onChange={(newValue) => {
                                    handleChange('pickupTime', newValue)
                                }}
                                renderInput={(params) => <TextField size="small" sx={{ m: 1, width: '25ch' }} {...params} />
                        }
                            />
                        </LocalizationProvider>
                    </div>
                    <div >
                        <Typography gutterBottom component="div" sx={{ mx: 1, width: '60ch' , fontWeight: '600'}}>
                            Return Date
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={values.returnDate}
                                minDate={values.pickupDate}
                                onChange={(newValue) => {
                                    handleChange('returnDate', newValue)
                                }}
                                renderInput={(params) => <TextField size='small' sx={{ m: 1, width: '60ch' }} {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div >
                        <Typography gutterBottom component="div" sx={{ mx: 1, width: '60ch' , fontWeight: '600'}}>
                            Return Time
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                value={values.returnTime}
                                onChange={(newValue) => {
                                    handleChange('returnTime', newValue)
                                }}
                                renderInput={(params) => <TextField size="small"  sx={{ m: 1, width: '25ch' }} {...params} />
                        }
                            />
                        </LocalizationProvider>
                    </div>
                </Box>
                {numOfDays && (
                    <div style={{margin : "25px 0"}}>
                    <Typography gutterBottom component="div" sx={{ mx: 1, fontWeight: '600'}}>
                                Num of Days : {numOfDays}
                    </Typography>
                </div>
                )}               
                <Box sx={{
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                }}>
                    <div>
                        <Typography gutterBottom component="div" sx={{ m: 1, width: '60ch' , fontWeight: '600'}}>
                            Vehicle Type
                        </Typography>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                                value={values.vehicleType}
                                onChange={(event) => {
                                    handleChange("vehicleType", event.target.value)
                                }}
                                input={<OutlinedInput size='small' />}
                            >
                                <MenuItem value="Car">Car</MenuItem>
                                <MenuItem value="SUV">SUV</MenuItem>
                                <MenuItem value="Van">Van</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Typography gutterBottom component="div" sx={{ m: 1, width: '60ch' , fontWeight: '600'}}>
                            Package Type
                        </Typography>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                                value={values.packageType}
                                onChange={(event) => {
                                    handleChange("packageType", event.target.value)
                                }}
                                input={<OutlinedInput size='small' />}
                            >
                                <MenuItem  value="Normal">Normal</MenuItem>
                                <MenuItem  value="Premium">Premium</MenuItem>
                                <MenuItem  value="Wedding">Wedding</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Box>
                {validationErr && <FormHelperText error={true} sx={{ mx: 1, fontSize : '1.3rem' , my : 1}}>{validationErr}</FormHelperText>}
                <Box sx= {{ mt : 6 , width: '85%' , display : 'flex' , justifyContent: 'flex-end'}}>
                    <Button variant="contained" size="large" sx={{ mr: 3, backgroundColor: '#158CBA'}} onClick={handleSubmit} >
                        {btnText}
                    </Button>
                    <Button variant="outlined" size="large" sx={{ borderColor : '#158CBA' }} onClick={() => history.goBack()}>
                        Cancel
                    </Button>
                </Box>
            </CardContent>

            </Card>
        </div>
    )
}

export default OrderForm
