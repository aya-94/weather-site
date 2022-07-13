"use strict";

import { handleGeoClick, handleSubmit } from "./scripts/controllers.js";
import { location_form, getLocation_btn, } from "./scripts/elements.js";

location_form.addEventListener('submit', handleSubmit)
getLocation_btn.addEventListener('click', handleGeoClick);