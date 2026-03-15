package com.gustavo.quittracker_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gustavo.quittracker_backend.model.Habit;

public interface HabitRepository extends JpaRepository<Habit, Long> {
    Optional<Habit> findByNameIgnoreCase(String name);
}
