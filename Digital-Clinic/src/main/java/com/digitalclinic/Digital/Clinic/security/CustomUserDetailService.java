package com.digitalclinic.Digital.Clinic.security;

import com.digitalclinic.Digital.Clinic.entities.User;
import com.digitalclinic.Digital.Clinic.exceptions.ResourceNotFoundException;
import com.digitalclinic.Digital.Clinic.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // loading user from database by username
        User fetchUser =(User) this.userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User ", " email : " + username, 0));
        System.out.println("zzzzzzzzzzzzzz");
        User user = new User();
        user.setUserid(fetchUser.getUserid());
        user.setFirstname(fetchUser.getFirstname());
        user.setLastname(fetchUser.getLastname());
        user.setEmail(fetchUser.getEmail());
        user.setPassword(fetchUser.getPassword());
        user.setPhone(fetchUser.getPhone());
        user.setRole(fetchUser.getRole());
        user.setActivate(fetchUser.isActivate());

        System.out.println(user);
        System.out.println(fetchUser);
        UserDetails userDetails = (UserDetails) user;
        System.out.println(userDetails);
        System.out.println("ababbababbabbababbabababababbababa");
        return userDetails;
    }
}
