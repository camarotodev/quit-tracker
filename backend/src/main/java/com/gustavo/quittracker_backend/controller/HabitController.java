package com.gustavo.quittracker_backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.gustavo.quittracker_backend.repository.HabitRepository;
import java.util.List;
import java.util.Optional;

import com.gustavo.quittracker_backend.model.Habit;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HabitController {
    private final HabitRepository habitRepository;

    public HabitController(HabitRepository habitRepository) {
        this.habitRepository = habitRepository;
    }

    @GetMapping("/habits")
    public List<Habit> getHabits() {
        return habitRepository.findAll();
    }

    @PostMapping("/habits")
    public Habit createHabit(@RequestBody Habit habit) {

        String nomeLimpo = habit.getName().trim();

        Optional<Habit> habitExistente = habitRepository.findByNameIgnoreCase(nomeLimpo);

        if (habitExistente.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vício já adicionado");
        }

        habit.setName(nomeLimpo);
        if(habit.getStartDate() == null) {
            habit.setStartDate(LocalDateTime.now());
        }

        return habitRepository.save(habit);
    }

    @PatchMapping("/habits/{id}/reset")
    public Habit resetHabit(@PathVariable Long id) {
        Habit habit = habitRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vício não encontrado"));

        habit.setStartDate(LocalDateTime.now());

        return habitRepository.save(habit);
    }
}