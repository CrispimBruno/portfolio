package br.puc.portfolio;

import java.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class PortfolioController {
    @GetMapping("/")
    public String index() { return "index"; }

    /** Devolve o pacote de mensagens (pt/en) para a troca de idioma sem recarregar. */
    @GetMapping("/api/i18n/{lang}") @ResponseBody
    public Map<String, String> i18n(@PathVariable String lang) {
        ResourceBundle b = ResourceBundle.getBundle("messages", Locale.forLanguageTag(lang),
            ResourceBundle.Control.getNoFallbackControl(ResourceBundle.Control.FORMAT_PROPERTIES));
        Map<String, String> out = new HashMap<>();
        for (String k : b.keySet()) out.put(k, b.getString(k));
        return out;
    }
}
