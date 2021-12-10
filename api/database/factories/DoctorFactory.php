<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'last_name' => $this->faker->lastName(),
            'specialties' => $this->faker->jobTitle(), // ! this should be a FK, not a string
            'cedula' => $this->faker->numerify('########') // 8 digits
        ];
    }
}
