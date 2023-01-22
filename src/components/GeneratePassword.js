import React, { useState, useRef } from 'react';
import { Box } from '@mui/system';
import { FormGroup, FormControlLabel, Grid, TextField, Button, InputAdornment, IconButton, Select, MenuItem, Typography, Slider, FormControl, FormLabel, dialogTitleClasses } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import * as _ from 'lodash';
import { CHAR, PASSWORD } from '../utils/Constants';
import CustomDialog from './CustomDialog';

function randomPasswordGenerator(props) {
    const { uppercase, lowercase, number, symbol, allowDuplicate, length } = props
    let chars = ""
    let passwordLength = length;
    let password = '';

    if (uppercase) {
        chars += CHAR.UPPERCASE
    }
    if (lowercase) {
        chars += CHAR.LOWERCASE
    }
    if (number) {
        chars += CHAR.NUMBER
    }
    if (symbol) {
        chars += CHAR.SYMBOL
    }


    const validation = (passwordToBe) => {
        let isValid = true
        let hasUppercase = false
        let hasLowercase = false
        let hasNumber = false
        let hasSymbol = false
        for (let character of passwordToBe) {
            if (uppercase && CHAR.UPPERCASE.includes(character)) {
                hasUppercase = true
            }
            if (lowercase && CHAR.LOWERCASE.includes(character)) {
                hasLowercase = true
            }
            if (number && CHAR.NUMBER.includes(character)) {
                hasNumber = true
            }
            if (symbol && CHAR.SYMBOL.includes(character)) {
                hasSymbol = true
            }
        }

        if (uppercase && !hasUppercase) {
            isValid = false
        }
        if (lowercase && !hasLowercase) {
            isValid = false
        }
        if (number && !hasNumber) {
            isValid = false
        }
        if (symbol && !hasSymbol) {
            isValid = false
        }

        return (isValid)
    }

    while (!validation(password)) {
        password = ''
        for (let i = 0; i < passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length)
            let char = chars.substring(randomNumber, randomNumber + 1)
            while (password.includes(char) && !allowDuplicate) {
                randomNumber = Math.floor(Math.random() * chars.length)
                char = chars.substring(randomNumber, randomNumber + 1)
            }
            password += chars.substring(randomNumber, randomNumber + 1)
        }
    }

    return password;
}

function GeneratePassword() {
    const [copied, setCopied] = useState(false)
    const [password, setPassword] = useState('')
    const [preference, setPreference] = useState({
        uppercase: true,
        lowercase: true,
        number: true,
        symbol: true,
        allowDuplicate: true,
        length: 12
    })
    const [openDialog, setOpenDialog] = useState(false)
    const [standard, setStandard] = useState('')
    const dialogContent = useRef('')
    const standardList = [
        {
            code: 'a',
            name: 'Standard A',
            rule: {
                uppercase: true,
                lowercase: true,
                number: true,
                symbol: true,
                allowDuplicate: false,
                length: 30
            }
        },
        {
            code: 'b',
            name: 'Standard B',
            rule: {
                uppercase: true,
                lowercase: false,
                number: true,
                symbol: false,
                allowDuplicate: true,
                length: 15
            }
        },
        {
            code: 'custom',
            name: 'Custom'
        },
    ]

    const handleTooltipOpen = () => {
        setCopied(true)
    }

    const handleTooltipClose = () => {
        setCopied(false)
    }

    const handleChange = (field, value) => {
        let newData = _.cloneDeep(preference)
        newData[field] = value
        setPreference(newData)
    }

    const validationBeforeGenerate = () => {
        // at least choose 1
        // only uppercase or lowercase then maximum 26 characters
        // only number or symbol then maximum 10 characters
        // only number and symbol then maximum 20 characters
        let isValid = true
        let errMsg = ''
        const acceptChars = {
            'uppercase': preference.uppercase,
            'lowercase': preference.lowercase,
            'number': preference.number,
            'symbol': preference.symbol
        }

        if (Object.values(acceptChars).filter(char => char).length === 0) {
            isValid = false;
            errMsg = 'At least tick one of the following: \nUppercase, lowercase, number and symbol';
        }

        if (!preference.allowDuplicate) {
            if (Object.values(acceptChars).filter(char => char).length === 1 && preference.length > 26 && (preference.uppercase || preference.lowercase)) {
                isValid = false;
                errMsg = 'If you wish to have no duplicate characters in your password and only uppercase or lowercase, the password length must be smaller than or equal to 26';
            }
            if (Object.values(acceptChars).filter(char => char).length === 1 && preference.length > 10 && (preference.number || preference.symbol)) {
                isValid = false;
                errMsg = 'If you wish to have no duplicate characters in your password and only number or symbol, the password length must be smaller than or equal to 10';
            }
            if (Object.values(acceptChars).filter(char => char).length === 2 && preference.length > 20 && preference.number && preference.symbol) {
                isValid = false;
                errMsg = 'If you wish to have no duplicate characters in your password  with only number and symbol, the password length must be smaller than or equal to 20';
            }
        }

        return { isValid, errMsg }
    }

    const handleChangePasswordStandard = (standardCode) => {
        setStandard(standardCode)
        if (standardList.find(stan => stan.code === standardCode)?.rule) {
            const rule = standardList.find(stan => stan.code === standardCode).rule
            setPreference(rule)
        }
    }

    return (
        <React.Fragment>
            <Grid container rowSpacing={2}>
                <Grid container item alignItems='center'>
                    <Grid item md={6}>
                        <Typography>
                            Preset password standard
                        </Typography>
                    </Grid>
                    <Tooltip
                        title="You can choose a universal password standard that guarantees you high security, or a custom style that is tailored for you"
                        placement="right">
                        <Grid item md={6} display='flex' justifyContent='flex-end'>
                            <Select
                                id="passwordStandard"
                                value={standard}
                                onChange={(e) => handleChangePasswordStandard(e.target.value)}
                            >
                                {
                                    standardList.map(standard => {
                                        return (
                                            <MenuItem value={standard.code}>{standard.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </Grid>
                    </Tooltip>
                </Grid>
                <Grid container item alignItems='center'>
                    <Grid item md={4}>
                        <Typography>
                            Uppercase letters
                        </Typography>
                    </Grid>
                    <Grid item md={8} display='flex' justifyContent='flex-end'>
                        <Checkbox
                            id='uppercase'
                            checked={preference.uppercase}
                            onChange={(e) => {
                                handleChangePasswordStandard('custom')
                                handleChange(e.target.id, e.target.checked)
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container item alignItems='center'>
                    <Grid item md={4}>
                        <Typography>
                            Lowercase letters
                        </Typography>
                    </Grid>
                    <Grid item md={8} display='flex' justifyContent='flex-end'>
                        <Checkbox
                            id='lowercase'
                            checked={preference.lowercase}
                            onChange={(e) => {
                                handleChangePasswordStandard('custom')
                                handleChange(e.target.id, e.target.checked)
                            }} />
                    </Grid>
                </Grid>
                <Grid container item alignItems='center'>
                    <Grid item md={4}>
                        <Typography>
                            Numbers
                        </Typography>
                    </Grid>
                    <Grid item md={8} display='flex' justifyContent='flex-end'>
                        <Checkbox
                            id='number'
                            checked={preference.number}
                            onChange={(e) => {
                                handleChangePasswordStandard('custom')
                                handleChange(e.target.id, e.target.checked)
                            }} />
                    </Grid>
                </Grid>
                <Grid container item alignItems='center'>
                    <Grid item md={4}>
                        <Typography>
                            Symbols
                        </Typography>
                    </Grid>
                    <Grid item md={8} display='flex' justifyContent='flex-end'>
                        <Checkbox
                            id='symbol'
                            checked={preference.symbol}
                            onChange={(e) => {
                                handleChangePasswordStandard('custom')
                                handleChange(e.target.id, e.target.checked)
                            }} />
                    </Grid>
                </Grid>
                <Grid container item alignItems='center'>
                    <Grid item md={4}>
                        <Typography>
                            Allow duplicate?
                        </Typography>
                    </Grid>
                    <Grid item md={8} display='flex' justifyContent='flex-end'>
                        <Checkbox
                            id='allowDuplicate'
                            checked={preference.allowDuplicate}
                            onChange={(e) => {
                                handleChangePasswordStandard('custom')
                                handleChange(e.target.id, e.target.checked)
                            }} />
                    </Grid>
                </Grid>
                <Grid container item alignItems='center'>
                    <Grid item md={4}>
                        <Typography>
                            Length
                        </Typography>
                    </Grid>
                    <Grid item md={8} display='flex' justifyContent='flex-end'>
                        <Grid md={10} display='flex' alignItems='center'>
                            <Slider
                                name="length"
                                value={preference.length}
                                step={1}
                                marks
                                min={4}
                                max={30}
                                onChange={(e) => {
                                    handleChangePasswordStandard('custom')
                                    handleChange(e.target.name, e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid md={2} display='flex' alignItems='center' justifyContent='center'>
                            {preference.length}
                        </Grid>
                    </Grid>

                </Grid>
                <Grid container item justifyContent='space-evenly' rowSpacing={1} columnSpacing={2}>
                    <Grid item md={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                setStandard(standardList[0])
                                setPreference({
                                    uppercase: true,
                                    lowercase: true,
                                    number: true,
                                    symbol: true,
                                    allowDuplicate: true,
                                    length: 12
                                })
                                setPassword('')
                            }}
                        >
                            Reset
                        </Button>
                    </Grid>
                    <Grid item md={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                const { isValid, errMsg } = validationBeforeGenerate()
                                if (isValid) {
                                    const newPassword = randomPasswordGenerator(preference)
                                    setPassword(newPassword)
                                } else {
                                    dialogContent.current = errMsg
                                    setOpenDialog(true)
                                }

                            }}
                        >
                            Generate
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item>
                    <TextField
                        fullWidth
                        id='password'
                        value={password}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end" >
                                    <ClickAwayListener onClickAway={handleTooltipClose}>
                                        <div>
                                            <Tooltip
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose}
                                                open={copied}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title="Copied!"
                                            >
                                                <IconButton
                                                    aria-label="copy"
                                                    edge="end"
                                                    onClick={() => {
                                                        handleTooltipOpen()
                                                        navigator.clipboard.writeText(password)
                                                    }}
                                                >
                                                    <ContentCopy />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </ClickAwayListener>
                                </InputAdornment>
                        }}
                    />
                </Grid>
            </Grid>
            <CustomDialog
                open={openDialog}
                setOpen={setOpenDialog}
                title={PASSWORD.WARNING}
                content={dialogContent.current}
                rightLabel='OK'
            />
        </React.Fragment>
    )
}

export default GeneratePassword;