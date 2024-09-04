import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Captcha from "@/pages/auth/Captcha";

import React, { useState, useEffect, useRef } from 'react';

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        initializeCaptcha(ctx);
    }, []);

    const generateRandomChar = (min, max) =>
        String.fromCharCode(Math.floor
            (Math.random() * (max - min + 1) + min));

    const generateCaptchaText = () => {
        let captcha = '';
        for (let i = 0; i < 3; i++) {
            captcha += generateRandomChar(65, 90);
            captcha += generateRandomChar(97, 122);
            captcha += generateRandomChar(48, 57);
        }
        return captcha.split('').sort(
            () => Math.random() - 0.5).join('');
    };

    const drawCaptchaOnCanvas = (ctx, captcha) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
        const letterSpace = 150 / captcha.length;
        for (let i = 0; i < captcha.length; i++) {
            const xInitialSpace = 25;
            ctx.font = '20px Roboto Mono';
            ctx.fillStyle = textColors[Math.floor(
                Math.random() * 2)];
            ctx.fillText(
                captcha[i],
                xInitialSpace + i * letterSpace,
                
                // Randomize Y position slightly
                Math.floor(Math.random() * 16 + 25),
                100
            );
        }
    };

    const initializeCaptcha = (ctx) => {
        setUserInput('');
        const newCaptcha = generateCaptchaText();
        setCaptchaText(newCaptcha);
        drawCaptchaOnCanvas(ctx, newCaptcha);
    };

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleCaptchaSubmit = (event) => {
      event.preventDefault();
      if (userInput === captchaText) {
        alert('Success');
        onSubmit(event);
    } else {
        alert('invalid Captcha');
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        initializeCaptcha(ctx);
        return false;
    }
    };

  return (
    <form onSubmit={handleCaptchaSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <div>
            {/* <h2 className="heading">
                Captcha Generator Using React
            </h2> */}
            <div className="container ">
                <div className="wrapper ">
                    <canvas ref={canvasRef}
                        width="200"
                        height="70" className="border-gray-500 border-[1px]">

                    </canvas>
                    <button id="reload-button" onClick={
                        () => initializeCaptcha(
                            canvasRef.current.getContext('2d'))}>
                        Reload
                    </button>
                </div>
                <input
                    type="text"
                    id="user-input"
                    placeholder="Enter the text in the image"
                    value={userInput}
                    onChange={handleUserInputChange}/>
                    
                {/* <button id="submit-button"
                    onClick={handleCaptchaSubmit}>
                    Submit
                </button> */}
            </div>
        </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
