import React, {useContext, useState} from 'react';
import {AppContext} from "../AppContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from "@material-ui/core/CircularProgress";

const STROOMER = 'WyIxNzE2MDU1MCIsIjg4ODg0NTIwIiwiOTg1NzMzNzUiLCI4MDA4NDcwOSIsIjE0MDAyNTgyIiwiOTY0NjQ3NDkiLCIwNzc0MzQwMCIsIjExOTQ4NzkyIiwiMTEzMzAyNjgiLCIyNDYwMzU4NCIsIjMwMTkwNzY5IiwiMTE0NjUyMTkiLCI4NDM2Nzk1NSIsIjU4NDI1MzczIiwiMTAzNjk4NzIiLCIwNzg3MjQxMiIsIjgzODI4NTUyIiwiMjEyMzI2NzIiLCIxNjk3NzkwOSIsIjI5ODE3OTk5IiwiNTgwMDUzMTMiLCIxMDY1NzIyNyIsIjA4MDA5NDAwIiwiMTA1NTcwODIiLCI4NTI1NDQ1NiIsIjcwODA2MTAyIiwiMjEzOTgzODkiLCIxOTE5NjI5OSIsIjE1MTcyNjE5IiwiMTcxMjIyODkiLCIyOTczMjkxMyIsIjcyMjQyMzAwIiwiOTY4MzM0OTgiLCI4MjAzNzIwNCIsIjMzNTk3ODk1IiwiOTU4MDE4ODAiLCI1ODgwNTUwNSIsIjA3ODk2NDM4IiwiODIwOTg4MTYiLCIxMTAwMzMyOSIsIjE0ODY0NDY0IiwiOTgwODQ0MzAiLCI4NTE5Mzk4NyIsIjA3ODIyMjk1IiwiNTk3MDI3MTAiLCI1MDM3NzMxNSIsIjUzMTQyOTQzIiwiMjU0Mzg0NjgiLCIxMDQxNDkxOSIsIjg5Nzc3ODEyIiwiMjgyNzU2OTkiLCI1OTk2NTIyNCIsIjE5MDg5OTM4IiwiMTAzNzU5MzkiLCIyMTY3MTM2NyIsIjg4OTY5NDE0IiwiMDUwMDAwNzQiLCI5MTE2ODgyNiIsIjk4NzE2NDM1IiwiNTE0MjkzODMiLCIzMjA3Nzg3OSIsIjUxMTg4MDgyIiwiMTIyNDg5NTUiLCIwMjg5MDg4MSIsIjE2NTg3NTY1IiwiOTEzNDY2NDYiLCIxMTg3MTgwNiIsIjExNzAwMzYwIiwiMTEyMDI2MjkiLCIxMTEwMDI5MyIsIjI5MzAwNzU2IiwiMjcxMDE5ODIiLCI5MDk4NzI4NSIsIjk0NTc5MDA2IiwiMjEyNzMyOTAiLCIxNjgwOTkwOSIsIjAwMTAwMDA5IiwiOTM2MTQ2NTUiLCI0NjA4NDMxMiIsIjkzNjAzMDc5IiwiODgwODQ4ODgiLCIxMTE2MTQxMCIsIjMyNDEyMzYzIiwiMjk2NTExNDUiLCI4MzA4Mjc3NSIsIjA5MDE4MDc1Il0';
//const TESTER = 'WyIwMDEwMDAwOSIsIjA5MDE4MDc1Il0';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * The login screen is the first page that users will see if they have never logged in.
 * @returns {*}
 * @constructor
 */
export default function LoginScreen() {
    const {getRoomToken} = useContext(AppContext);
    const [requestToLogin, setRequestToLogin] = useState(false);
    const [phoneNo, setPhoneNo] = useState('62');
    const [identity, setIdentity] = useState('');
    const [openSnackbar, setOpenSnackBar] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoadig] = useState(false);

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    function showError(message) {
        setErrorMessage(message);
        setOpenSnackBar(true);
    }

    async function onLogin(event) {
        event.preventDefault();
        const phone = event.target.elements.phoneNumber.value;
        const identity = event.target.elements.identity.value;
        if (identity.length < 4) {
            showError('Minimal nama panggilan terdiri 4 karakter');
            return;
        }
        if (phone.length < 8) {
            showError('Nomer yang anda masukkan tidak valid');
            return;
        }
        const phoneDigit = phone.substring(phone.length - 8, phone.length);

        const isValid = JSON.parse(atob(STROOMER)).indexOf(phoneDigit) >= 0;
        if (!isValid) {
            showError('Maaf nomer anda tidak terdaftar sebagai anggota Str00m');
        } else {
            setIsLoadig(true);
            await getRoomToken({identity: identity, room: 'z00m'});
        }

    }

    return <div
        style={{alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100%', width: '100%'}}>
        <div>
            {!requestToLogin &&
            <div style={{
                background: 'rgba(0,0,0,0.5)',
                border: '2px solid rgba(0,0,0,0.1)',
                height: '20rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0px 10px 10px -5px rgba(0,0,0,1)'
            }} onClick={(event) => setRequestToLogin(true)}>
                <svg id="svg" version="1.1" viewBox="0, 0, 400,486.3157894736842" height={'100%'}>
                    <g>
                        <path
                            d="M175.600 46.479 C 171.783 47.057,168.474 48.385,165.980 50.341 C 164.675 51.363,162.907 52.679,162.049 53.264 C 158.745 55.519,151.600 66.657,151.600 69.551 C 151.600 72.312,154.437 73.752,157.344 72.466 C 159.190 71.649,159.323 71.480,164.142 63.800 C 170.493 53.680,180.835 52.599,193.000 60.783 C 193.880 61.375,196.573 62.904,198.983 64.182 C 201.394 65.459,204.837 67.462,206.634 68.633 C 213.161 72.888,221.693 76.946,227.316 78.470 C 228.902 78.900,230.920 79.446,231.800 79.684 C 234.388 80.384,243.407 80.269,246.200 79.500 C 247.520 79.137,249.507 78.642,250.615 78.401 C 251.723 78.159,253.640 77.295,254.876 76.481 C 256.111 75.666,258.175 74.302,259.461 73.450 C 267.219 68.309,271.495 61.957,269.032 59.235 C 267.392 57.423,263.625 58.229,261.406 60.866 C 260.440 62.013,258.288 63.705,253.607 66.995 C 247.458 71.317,240.577 72.771,231.800 71.603 C 226.062 70.839,211.132 63.344,204.739 58.017 C 202.286 55.974,187.416 47.949,186.152 47.987 C 185.906 47.994,184.646 47.666,183.352 47.258 C 180.237 46.275,178.261 46.076,175.600 46.479 M131.800 114.385 C 91.001 114.648,94.599 114.346,86.630 118.177 C 80.190 121.273,77.201 124.890,74.315 133.077 L 73.073 136.600 72.885 167.436 C 72.656 204.690,72.472 203.330,77.384 200.635 C 78.823 199.846,81.193 198.546,82.652 197.746 L 85.303 196.292 91.552 196.119 C 94.988 196.024,152.520 195.908,219.400 195.862 C 286.280 195.815,341.378 195.633,341.841 195.457 C 344.657 194.387,344.187 189.968,340.434 182.238 C 339.110 179.510,337.680 176.406,337.255 175.339 C 336.831 174.273,335.817 171.870,335.003 170.000 C 334.189 168.130,333.165 165.453,332.728 164.052 C 332.291 162.651,330.778 159.079,329.367 156.115 C 327.955 153.151,326.800 150.658,326.800 150.575 C 326.800 150.282,324.771 145.777,323.839 144.000 C 323.319 143.010,322.758 141.750,322.592 141.200 C 322.426 140.650,321.869 139.277,321.356 138.149 C 320.842 137.022,319.805 134.592,319.052 132.749 C 313.617 119.458,311.969 116.428,309.446 115.084 L 307.800 114.207 237.800 114.180 C 199.300 114.165,151.600 114.257,131.800 114.385 M347.051 225.112 C 346.420 225.195,345.020 225.883,343.940 226.642 C 342.078 227.951,339.608 229.027,334.200 230.886 C 331.127 231.942,324.912 231.963,209.600 231.312 C 72.522 230.538,76.001 230.538,74.559 231.302 C 71.896 232.713,72.070 230.344,71.806 268.755 C 71.543 306.923,71.464 305.433,73.839 306.989 C 74.720 307.566,86.169 307.623,198.704 307.615 L 322.600 307.606 326.200 306.381 C 335.473 303.225,342.985 294.239,343.981 285.109 C 344.191 283.189,344.537 281.291,344.751 280.891 C 344.965 280.491,345.343 277.202,345.591 273.582 C 345.839 269.962,346.196 266.100,346.384 265.000 C 346.573 263.900,346.922 260.660,347.162 257.800 C 347.928 248.647,349.215 235.488,349.627 232.600 C 350.348 227.549,349.403 224.802,347.051 225.112 M73.762 341.242 C 72.846 342.253,72.346 398.617,73.195 405.088 C 74.776 417.131,81.955 424.781,94.400 427.686 C 97.587 428.430,306.598 428.444,309.041 427.700 C 311.279 427.019,312.539 425.742,313.508 423.170 C 313.959 421.977,315.224 419.110,316.320 416.800 C 317.416 414.490,318.875 411.250,319.563 409.600 C 320.251 407.950,321.102 406.060,321.454 405.400 C 321.806 404.740,322.693 402.551,323.427 400.536 C 325.112 395.905,326.419 392.792,328.693 388.000 C 329.684 385.910,330.733 383.570,331.022 382.800 C 332.079 379.992,334.037 375.437,334.365 375.024 C 334.550 374.791,334.834 374.150,334.994 373.600 C 335.155 373.050,336.167 370.593,337.243 368.141 C 338.319 365.689,339.200 363.578,339.200 363.451 C 339.200 363.324,340.122 361.280,341.249 358.910 C 343.675 353.806,344.236 350.471,342.937 348.869 C 341.215 346.744,347.335 346.841,211.995 346.811 C 142.909 346.795,85.995 346.628,85.332 346.438 C 84.295 346.141,78.227 342.645,75.817 340.957 C 74.780 340.230,74.663 340.247,73.762 341.242 "
                            stroke="none" fill="#fbcc07" fillRule="evenodd"/>
                    </g>
                </svg>
                <label style={{textAlign: 'center', fontSize: '5rem'}}>z00m</label>
                <label style={{textAlign: 'center', marginBottom: '1rem', fontSize: '1rem'}}>
                    Click to Join v1.1
                </label>
            </div>
            }
            {requestToLogin &&
            <form action="" onSubmit={(event) => onLogin(event)} style={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: '1rem',
                margin:'1rem',
                maxWidth : 250,
                border: '1px solid rgba(0,0,0,0.2)',
                boxShadow: '0px 20px 10px -10px rgba(0,0,0,0.4)'
            }}>
                <TextField label={'Nama Panggilan'}
                           variant={'standard'}
                           type="text"
                           name={'identity'}
                           style={{
                               padding: 5,
                               paddingLeft: 20
                           }}
                           disabled={isLoading}
                           value={identity}
                           onChange={(event) => {
                               setIdentity(event.target.value.toUpperCase());
                           }}
                />
                <div style={{position: 'relative'}}>
                    <label style={{
                        color: '#FFFFFF',
                        position: 'absolute',
                        bottom: 13,
                        left: '0px',
                        fontSize: '2rem',
                        fontWeight: 'bold'
                    }}>+</label>
                    <TextField label={'Phone No'}
                               variant={'standard'}
                               type="text"
                               name={'phoneNumber'}
                               disabled={isLoading}
                               style={{

                                   padding: 5,
                                   paddingLeft: 20
                               }}
                               value={phoneNo}
                               onChange={(event) => {
                                   setPhoneNo(event.target.value);
                               }}
                               placeholder={"62812345678"}/>

                </div>
                <div style={{display:'flex',justifyContent:'flex-end',marginTop:'1rem',marginRight:5}}>
                    <Button variant={'contained'} type={'submit'}
                            disabled={isLoading}>Login</Button>
                </div>

                {isLoading &&
                <CircularProgress size={'5rem'} style={{position: 'absolute', left: 90, bottom: 80,color:'#FBCF14'}}/>
                }
            </form>
            }

        </div>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" >
                {errorMessage}
            </Alert>
        </Snackbar>
    </div>
}
