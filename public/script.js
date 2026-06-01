let cart = [];
let currentUser = null;
let isLoginMode = true;

const medicines = [
    // PASTE ALL YOUR MEDICINES HERE (full list)
    {id:1, product:"Albendazole Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antinematodal Anthelmintic Agents", inn:"Albendazole", price:280},
    {id:2, product:"Aspirin Tablets", form:"Tablet", route:"Oral", therapeutic:"Analgesics & Antipyretics", inn:"Acetylsalicylic Acid", price:120},
    // ... all your prod {id:3, product:"Lonart Forte Tablet", form:"Tablet", route:"Oral", therapeutic:"Antimalarial Antiprotozoals", inn:"Artemether + Lumefantrine", price:450},
            {id:4, product:"Gaviscon Double Action", form:"Syrup", route:"Oral", therapeutic:"Peptic Ulcer Drugs", inn:"Calcium Carbonate + Alginate", price:680},
            {id:5, product:"Betamed Cream", form:"Cream", route:"Topical", therapeutic:"Corticosteroids", inn:"Betamethasone Valerate", price:320},
            {id:6, product:"Medizole Cream", form:"Cream", route:"Topical", therapeutic:"Antifungals", inn:"Clotrimazole", price:260},
            {id:7, product:"Diclomed Gel", form:"Gel", route:"Topical", therapeutic:"NSAID", inn:"Diclofenac", price:280},
            {id:8, product:"Moximed Capsules", form:"Capsule", route:"Oral", therapeutic:"Antibiotics", inn:"Amoxicillin", price:420},
            {id:9, product:"Panadol Elixir", form:"Oral Suspension", route:"Oral", therapeutic:"Analgesics", inn:"Paracetamol", price:290},
            {id:10, product:"Ultane Liquid Anaesthetic", form:"Liquid", route:"Inhalation", therapeutic:"Anaesthetics", inn:"Sevoflurane", price:44148},
            {id:11, product:"Airtal Tablets 100mg", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Aceclofenac", price:1092},
            {id:12, product:"BioGaia Protectis Drops", form:"Drops", route:"Oral", therapeutic:"Probiotics", inn:"L. reuteri", price:1750},
            {id:13, product:"Adrenaline PFS", form:"Pre-filled Syringe", route:"Injection", therapeutic:"Emergency", inn:"Adrenaline", price:16196},
            {id:14, product:"Atropine PFS", form:"Pre-filled Syringe", route:"Injection", therapeutic:"Emergency", inn:"Atropine", price:11878},
            {id:15, product:"Hirudoid Gel", form:"Gel", route:"Topical", therapeutic:"Venous", inn:"Mucopolysaccharide", price:988},
            {id:16, product:"Ebastel Tablets", form:"Tablet", route:"Oral", therapeutic:"Antihistamine", inn:"Ebastine", price:3140},
            {id:17, product:"Almax Forte Sachets", form:"Sachets", route:"Oral", therapeutic:"Antacid", inn:"Almagate", price:1632},
            {id:18, product:"Truvada Tablets", form:"Tablet", route:"Oral", therapeutic:"ARV", inn:"Emtricitabine + Tenofovir", price:6704},
            {id:19, product:"Vemlidy Tablets", form:"Tablet", route:"Oral", therapeutic:"ARV", inn:"Tenofovir Alafenamide", price:4814},
            {id:20, product:"Norflex Tablets", form:"Tablet", route:"Oral", therapeutic:"Muscle Relaxant", inn:"Orphenadrine", price:1014},
            {id:21, product:"Fastum Gel", form:"Gel", route:"Topical", therapeutic:"NSAID", inn:"Ketoprofen", price:828},
            {id:22, product:"Pabrinex Ampoules", form:"Ampoules", route:"Injection", therapeutic:"Vitamins", inn:"Vitamins B & C", price:7068},
            {id:23, product:"Aldara Cream", form:"Cream", route:"Topical", therapeutic:"Immunomodulator", inn:"Imiquimod", price:15968},
            {id:24, product:"Duromine 30mg", form:"Capsule", route:"Oral", therapeutic:"Appetite Suppressant", inn:"Phentermine", price:7334},
            {id:25, product:"Rupanase Tablets", form:"Tablet", route:"Oral", therapeutic:"Antihistamine", inn:"Rupatadine", price:1542},
            {id:26, product:"Emitino Injection 4mg", form:"Injection", route:"IV", therapeutic:"Antiemetic", inn:"Ondansetron", price:6668},
            {id:27, product:"Clavace 625 Tablets", form:"Tablet", route:"Oral", therapeutic:"Antibiotics", inn:"Amoxicillin + Clavulanic Acid", price:260},
            {id:28, product:"Cachmax 400mg", form:"Tablet", route:"Oral", therapeutic:"Antibiotics", inn:"Cefixime", price:340},
            {id:29, product:"Actilosa Capsules", form:"Capsule", route:"Oral", therapeutic:"Probiotic", inn:"Probiotics", price:1102},
            {id:30, product:"Vitoc D Softgel", form:"Softgel", route:"Oral", therapeutic:"Vitamin D", inn:"Cholecalciferol", price:600},
            {id:31, product:"Lioton Gel", form:"Gel", route:"Topical", therapeutic:"Venous", inn:"Heparin", price:1108},
            {id:32, product:"Metforal 500mg", form:"Tablet", route:"Oral", therapeutic:"Antidiabetic", inn:"Metformin", price:716},
            {id:33, product:"Nebilet 5mg", form:"Tablet", route:"Oral", therapeutic:"Antihypertensive", inn:"Nebivolol", price:3304},
            {id:34, product:"Spasmomen 40mg", form:"Tablet", route:"Oral", therapeutic:"Antispasmodic", inn:"Otilonium Bromide", price:1532},
            {id:35, product:"Priligy 30mg", form:"Tablet", route:"Oral", therapeutic:"PE Treatment", inn:"Dapoxetine", price:3456},
            {id:36, product:"Ranexa 500mg", form:"Tablet", route:"Oral", therapeutic:"Anti-anginal", inn:"Ranolazine", price:8792},
            {id:37, product:"Elical Cream", form:"Cream", route:"Topical", therapeutic:"Corticosteroid", inn:"Mometasone", price:1134},
            {id:38, product:"Pernex AC Gel", form:"Gel", route:"Topical", therapeutic:"Acne", inn:"Benzoyl Peroxide", price:696},
            {id:39, product:"Dynamogen Oral Solution", form:"Solution", route:"Oral", therapeutic:"Appetite Stimulant", inn:"Glutodine", price:1604},
            {id:40, product:"Defal Drops", form:"Drops", route:"Oral", therapeutic:"Corticosteroid", inn:"Deflazacort", price:2758},
            {id:41, product:"Distem Tablets", form:"Tablet", route:"Oral", therapeutic:"Muscle Relaxant", inn:"Methocarbamol", price:1582},
            {id:42, product:"Bronquidiazina Suspension", form:"Suspension", route:"Oral", therapeutic:"Expectorant", inn:"Sulfamethoxazole", price:1088},
            {id:43, product:"Ideos Chewable", form:"Tablet", route:"Oral", therapeutic:"Calcium + Vit D", inn:"Calcium Carbonate", price:1712},
            {id:44, product:"Phlebodia 600mg", form:"Tablet", route:"Oral", therapeutic:"Venous", inn:"Diosmin", price:1196},
            {id:45, product:"Polygynax Pessaries", form:"Pessary", route:"Vaginal", therapeutic:"Anti-infective", inn:"Nystatin + Neomycin", price:1462},
            {id:46, product:"Tot'hema Oral Solution", form:"Ampoule", route:"Oral", therapeutic:"Iron Supplement", inn:"Iron", price:1254},
            {id:47, product:"Cachcet Syrup", form:"Syrup", route:"Oral", therapeutic:"Antihistamine", inn:"Cetirizine", price:96},
            {id:48, product:"Lysoflam Gel", form:"Gel", route:"Topical", therapeutic:"NSAID", inn:"Diclofenac", price:268},
            {id:49, product:"Tramacetal Tablets", form:"Tablet", route:"Oral", therapeutic:"Analgesic", inn:"Paracetamol + Tramadol", price:600},
            {id:50, product:"Eascol Expectorant", form:"Syrup", route:"Oral", therapeutic:"Cough", inn:"Bromhexine", price:142},
            {id:51, product:"Emitino Tablets 8mg", form:"Tablet", route:"Oral", therapeutic:"Antiemetic", inn:"Ondansetron", price:974},
            {id:52, product:"Clavace Dry Syrup", form:"Dry Syrup", route:"Oral", therapeutic:"Antibiotics", inn:"Amoxicillin + Clavulanic", price:368},
            {id:53, product:"Cachmax DS Suspension", form:"Suspension", route:"Oral", therapeutic:"Antibiotics", inn:"Cefixime", price:300},
            {id:54, product:"Actilosa Dry Syrup", form:"Dry Syrup", route:"Oral", therapeutic:"Probiotic", inn:"Probiotics", price:800},
            {id:55, product:"Vitoc D Drops", form:"Drops", route:"Oral", therapeutic:"Vitamin D", inn:"Cholecalciferol", price:534},
            {id:56, product:"Lioton Gel 30g", form:"Gel", route:"Topical", therapeutic:"Venous", inn:"Heparin", price:1108},
            {id:57, product:"Nebilet Plus", form:"Tablet", route:"Oral", therapeutic:"Antihypertensive", inn:"Nebivolol + HCTZ", price:3304},
            {id:58, product:"Fastum Gel 50g", form:"Gel", route:"Topical", therapeutic:"NSAID", inn:"Ketoprofen", price:1286},
            {id:59, product:"Hirudoid Gel", form:"Gel", route:"Topical", therapeutic:"Venous", inn:"Heparinoid", price:988},
            {id:60, product:"Polygynax 12's", form:"Pessary", route:"Vaginal", therapeutic:"Anti-infective", inn:"Polymyxin + Nystatin", price:1462},
            {id:61, product:"Bronquidiazina Suspension", form:"Suspension", route:"Oral", therapeutic:"Cough", inn:"Bromhexine", price:1088},
            {id:62, product:"Dynamogen Oral Solution", form:"Solution", route:"Oral", therapeutic:"Appetite Stimulant", inn:"Glutodine", price:1604},
            {id:63, product:"Emitino Suspension", form:"Suspension", route:"Oral", therapeutic:"Antiemetic", inn:"Ondansetron", price:708},
            {id:64, product:"Loobid Tablets", form:"Tablet", route:"Oral", therapeutic:"Antibiotics", inn:"Ofloxacin + Ornidazole", price:600},
            {id:65, product:"Lyssoflam Tablets", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Diclofenac + Paracetamol", price:1068},
            {id:66, product:"Trama-50 Capsules", form:"Capsule", route:"Oral", therapeutic:"Analgesic", inn:"Tramadol", price:868},
            {id:67, product:"Cavit Suspension", form:"Suspension", route:"Oral", therapeutic:"Mineral Supplement", inn:"Calcium + Vitamin D", price:324},
            {id:68, product:"Cazithro Suspension", form:"Suspension", route:"Oral", therapeutic:"Antibiotics", inn:"Azithromycin", price:160},
            {id:69, product:"Cazithro Tablets", form:"Tablet", route:"Oral", therapeutic:"Antibiotics", inn:"Azithromycin", price:128},
            {id:70, product:"Clavace Dry Syrup 457mg", form:"Dry Syrup", route:"Oral", therapeutic:"Antibiotics", inn:"Amoxicillin + Clavulanic", price:368},
            {id:71, product:"Emitino Tablets 4mg", form:"Tablet", route:"Oral", therapeutic:"Antiemetic", inn:"Ondansetron", price:768},
            {id:72, product:"Lysoflam Gel", form:"Gel", route:"Topical", therapeutic:"NSAID", inn:"Diclofenac", price:268},
            {id:73, product:"Cachner Ve Capsules", form:"Capsule", route:"Oral", therapeutic:"Neurological", inn:"Alpha Lipoic Acid", price:2268},
            {id:74, product:"Canem Injection 1g", form:"Injection", route:"IV", therapeutic:"Antibiotics", inn:"Meropenem", price:1412},
            {id:75, product:"Utilf Sachet", form:"Sachet", route:"Oral", therapeutic:"Urinary", inn:"Potassium Magnesium Citrate", price:1380},
            {id:76, product:"Cachcet Tablets 10mg", form:"Tablet", route:"Oral", therapeutic:"Antihistamine", inn:"Cetirizine", price:176},
            {id:77, product:"Cachmax 400mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Antibiotics", inn:"Cefixime", price:340},
            {id:78, product:"Actilosa Dry Syrup 30ml", form:"Dry Syrup", route:"Oral", therapeutic:"Probiotic", inn:"Probiotics", price:800},
            {id:79, product:"Vitoc D Drops 15ml", form:"Drops", route:"Oral", therapeutic:"Vitamin D", inn:"Cholecalciferol", price:534},
            {id:80, product:"Nebilet Plus 5/12.5mg", form:"Tablet", route:"Oral", therapeutic:"Antihypertensive", inn:"Nebivolol + HCTZ", price:3304},
            {id:81, product:"Fastum Gel 20g", form:"Gel", route:"Topical", therapeutic:"NSAID", inn:"Ketoprofen", price:508},
            {id:82, product:"Pernex AC 5% Gel", form:"Gel", route:"Topical", therapeutic:"Acne", inn:"Benzoyl Peroxide", price:696},
            {id:83, product:"Dynamogen Oral Solution 10ml", form:"Solution", route:"Oral", therapeutic:"Appetite Stimulant", inn:"Glutodine", price:1604},
            {id:84, product:"Defal Drops 22.75mg/ml", form:"Drops", route:"Oral", therapeutic:"Corticosteroid", inn:"Deflazacort", price:2758},
            {id:85, product:"Distem Tablets 380/300mg", form:"Tablet", route:"Oral", therapeutic:"Muscle Relaxant", inn:"Methocarbamol + Paracetamol", price:1582},
            {id:86, product:"Bronquidiazina CR Suspension", form:"Suspension", route:"Oral", therapeutic:"Expectorant", inn:"Bromhexine", price:1088},
            {id:87, product:"Ideos Chewable Tablets", form:"Tablet", route:"Oral", therapeutic:"Calcium + Vit D", inn:"Calcium Carbonate", price:1712},
            {id:88, product:"Phlebodia 600mg", form:"Tablet", route:"Oral", therapeutic:"Venous", inn:"Diosmin", price:1196},
            {id:89, product:"Polygynax Pessaries 12's", form:"Pessary", route:"Vaginal", therapeutic:"Anti-infective", inn:"Nystatin + Neomycin", price:1462},
            {id:90, product:"Tot'hema Oral Solution", form:"Ampoule", route:"Oral", therapeutic:"Iron Supplement", inn:"Iron", price:1254},
            {id:91, product:"Cachcet 5mg/5ml Syrup", form:"Syrup", route:"Oral", therapeutic:"Antihistamine", inn:"Cetirizine", price:96},
            {id:92, product:"Lyssoflam Tablets", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Diclofenac + Paracetamol", price:1068},
            {id:93, product:"Trama-50 Capsules", form:"Capsule", route:"Oral", therapeutic:"Analgesic", inn:"Tramadol", price:868},
            {id:94, product:"Cavit Suspension 150ml", form:"Suspension", route:"Oral", therapeutic:"Mineral Supplement", inn:"Calcium + Vit D", price:324},
            {id:95, product:"Cazithro Suspension 200mg/5ml", form:"Suspension", route:"Oral", therapeutic:"Antibiotics", inn:"Azithromycin", price:160},
            {id:96, product:"Cazithro Tablets 500mg", form:"Tablet", route:"Oral", therapeutic:"Antibiotics", inn:"Azithromycin", price:128},
            {id:97, product:"Clavace Dry Syrup 228.5mg", form:"Dry Syrup", route:"Oral", therapeutic:"Antibiotics", inn:"Amoxicillin + Clavulanic", price:270},
            {id:98, product:"Cachmax DS Oral Suspension", form:"Suspension", route:"Oral", therapeutic:"Antibiotics", inn:"Cefixime", price:300},
            {id:99, product:"Actilosa Dry Syrup", form:"Dry Syrup", route:"Oral", therapeutic:"Probiotic", inn:"Probiotics", price:800},
            {id:100, product:"Vitoc D Softgel Caps", form:"Softgel", route:"Oral", therapeutic:"Vitamin D", inn:"Cholecalciferol", price:600},
            {id:101, product:"Sevoflurane Ultane 250ml", form:"Liquid", route:"Inhalation", therapeutic:"Anaesthetics", inn:"Sevoflurane", price:44148},
            {id:102, product:"Adrenaline PFS 0.1mg/ml 10ml", form:"Pre-filled Syringe", route:"Injection", therapeutic:"Emergency Medicines", inn:"Adrenaline", price:16196},
            {id:103, product:"Atropine Sulphate PFS 0.1mg/ml", form:"Pre-filled Syringe", route:"Injection", therapeutic:"Emergency Medicines", inn:"Atropine", price:11878},
            {id:104, product:"Ephedrine HCL PFS 3mg/ml", form:"Pre-filled Syringe", route:"Injection", therapeutic:"Emergency Medicines", inn:"Ephedrine", price:16000},
            {id:105, product:"Phenylephrine PFS 50mcg/ml", form:"Pre-filled Syringe", route:"Injection", therapeutic:"Emergency Medicines", inn:"Phenylephrine", price:16196},
            {id:106, product:"Airtal Tablets 100mg", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Aceclofenac", price:1092},
            {id:107, product:"Almax Forte Sachets", form:"Sachets", route:"Oral", therapeutic:"Antacid", inn:"Almagate", price:1632},
            {id:108, product:"Almax Oral Suspension", form:"Suspension", route:"Oral", therapeutic:"Antacid", inn:"Almagate", price:1246},
            {id:109, product:"Ebastel Tablets 10mg", form:"Tablet", route:"Oral", therapeutic:"Antihistamine", inn:"Ebastine", price:3140},
            {id:110, product:"Ebastel Solution", form:"Solution", route:"Oral", therapeutic:"Antihistamine", inn:"Ebastine", price:1942},
            {id:111, product:"Sekisan Oral Syrup", form:"Syrup", route:"Oral", therapeutic:"Cough Suppressant", inn:"Cloperastine", price:1012},
            {id:112, product:"Indirab Vaccine", form:"Vial", route:"Injection", therapeutic:"Vaccine", inn:"Rabies Vaccine", price:1334},
            {id:113, product:"Regen-DTM Gel", form:"Gel", route:"Topical", therapeutic:"Wound Healing", inn:"Epidermal Growth Factor", price:4220},
            {id:114, product:"Revac B+ Adult Vaccine", form:"Vial", route:"Injection", therapeutic:"Vaccine", inn:"Hepatitis B", price:3668},
            {id:115, product:"Typbar Vaccine", form:"Vial", route:"Injection", therapeutic:"Vaccine", inn:"Typhoid", price:2934},
            {id:116, product:"Dermatofix Cream 2%", form:"Cream", route:"Topical", therapeutic:"Antifungal", inn:"Sertaconazole", price:926},
            {id:117, product:"Gamalate B6 Solution", form:"Solution", route:"Oral", therapeutic:"Neurological", inn:"Gamma-Aminobutyric Acid", price:11840},
            {id:118, product:"Nucleo C.M.P Forte", form:"Capsule", route:"Oral", therapeutic:"Neurological", inn:"Cytidine + Uridine", price:1876},
            {id:119, product:"Peitel 0.25% Cream", form:"Cream", route:"Topical", therapeutic:"Corticosteroid", inn:"Prednicarbate", price:1414},
            {id:120, product:"Somazina Injection 1000mg", form:"Injection", route:"IV", therapeutic:"Neurological", inn:"Citicoline", price:7238},
            {id:121, product:"Somazina Oral Solution", form:"Sachets", route:"Oral", therapeutic:"Neurological", inn:"Citicoline", price:5572},
            {id:122, product:"Bifril Tablets 30mg", form:"Tablet", route:"Oral", therapeutic:"ACE Inhibitor", inn:"Zofenopril", price:2544},
            {id:123, product:"Bifril Plus Tablets", form:"Tablet", route:"Oral", therapeutic:"ACE Inhibitor", inn:"Zofenopril + HCTZ", price:2544},
            {id:124, product:"Ketesse Tablets 25mg", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Dexketoprofen", price:1438},
            {id:125, product:"Ketesse Injection", form:"Injection", route:"IM/IV", therapeutic:"NSAID", inn:"Dexketoprofen", price:1110},
            {id:126, product:"Metforal 850mg", form:"Tablet", route:"Oral", therapeutic:"Antidiabetic", inn:"Metformin", price:716},
            {id:127, product:"Nebilet Plus 5/25mg", form:"Tablet", route:"Oral", therapeutic:"Antihypertensive", inn:"Nebivolol + HCTZ", price:3304},
            {id:128, product:"Ranexa 375mg", form:"Tablet", route:"Oral", therapeutic:"Anti-anginal", inn:"Ranolazine", price:8792},
            {id:129, product:"Priligy 60mg", form:"Tablet", route:"Oral", therapeutic:"PE Treatment", inn:"Dapoxetine", price:4750},
            {id:130, product:"Spasmomen 40mg", form:"Tablet", route:"Oral", therapeutic:"Antispasmodic", inn:"Otilonium Bromide", price:1532},
            {id:201, product:"Amoxicillin 500mg Capsules", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam Antibacterials", inn:"Amoxicillin", price:380},
            {id:202, product:"Ciprofloxacin 500mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Quinolone Antibacterials", inn:"Ciprofloxacin", price:420},
            {id:203, product:"Metronidazole 400mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Antiprotozoal", inn:"Metronidazole", price:180},
            {id:204, product:"Artemether Lumefantrine 20/120mg", form:"Tablet", route:"Oral", therapeutic:"Antimalarial", inn:"Artemether + Lumefantrine", price:320},
            {id:205, product:"Coartem Dispersible", form:"Dispersible Tablet", route:"Oral", therapeutic:"Antimalarial", inn:"Artemether + Lumefantrine", price:650},
            {id:206, product:"Paracetamol 500mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Analgesics", inn:"Paracetamol", price:85},
            {id:207, product:"Ibuprofen 400mg Tablets", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Ibuprofen", price:150},
            {id:208, product:"Diclofenac 50mg Tablets", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Diclofenac", price:220},
            {id:209, product:"Cetirizine 10mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Antihistamine", inn:"Cetirizine", price:140},
            {id:210, product:"Loratadine 10mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Antihistamine", inn:"Loratadine", price:195},
            {id:211, product:"Omeprazole 20mg Capsules", form:"Capsule", route:"Oral", therapeutic:"Proton Pump Inhibitor", inn:"Omeprazole", price:280},
            {id:212, product:"Pantoprazole 40mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Proton Pump Inhibitor", inn:"Pantoprazole", price:450},
            {id:213, product:"Amoxicillin Clavulanate 625mg", form:"Tablet", route:"Oral", therapeutic:"Beta-Lactam Antibacterials", inn:"Amoxicillin + Clavulanic Acid", price:520},
            {id:214, product:"Azithromycin 500mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Macrolide Antibiotics", inn:"Azithromycin", price:680},
            {id:215, product:"Doxycycline 100mg Capsules", form:"Capsule", route:"Oral", therapeutic:"Tetracycline", inn:"Doxycycline", price:320},
            {id:216, product:"Losartan 50mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Antihypertensive", inn:"Losartan", price:420},
            {id:217, product:"Amlodipine 10mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Calcium Channel Blocker", inn:"Amlodipine", price:280},
            {id:218, product:"Metformin 850mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Antidiabetic", inn:"Metformin", price:180},
            {id:219, product:"Glibenclamide 5mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Antidiabetic", inn:"Glibenclamide", price:160},
            {id:220, product:"Insulin Glargine 100IU/ml", form:"Cartridge", route:"Subcutaneous", therapeutic:"Antidiabetic", inn:"Insulin Glargine", price:2850},
            {id:221, product:"Salbutamol Inhaler", form:"Inhaler", route:"Inhalation", therapeutic:"Bronchodilator", inn:"Salbutamol", price:680},
            {id:222, product:"Beclomethasone Inhaler", form:"Inhaler", route:"Inhalation", therapeutic:"Corticosteroid", inn:"Beclomethasone", price:920},
            {id:223, product:"Fluconazole 150mg Capsule", form:"Capsule", route:"Oral", therapeutic:"Antifungal", inn:"Fluconazole", price:280},
            {id:224, product:"Miconazole Oral Gel", form:"Gel", route:"Oral", therapeutic:"Antifungal", inn:"Miconazole", price:450},
            {id:225, product:"Ferrous Sulphate 200mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Iron Supplement", inn:"Ferrous Sulphate", price:120},
            {id:226, product:"Folic Acid 5mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Vitamin", inn:"Folic Acid", price:95},
            {id:227, product:"Vitamin C 500mg Effervescent", form:"Tablet", route:"Oral", therapeutic:"Vitamin", inn:"Ascorbic Acid", price:380},
            {id:228, product:"Multivitamin Syrup 200ml", form:"Syrup", route:"Oral", therapeutic:"Multivitamin", inn:"Multivitamins", price:520},
            {id:229, product:"ORS Oral Rehydration Salts", form:"Sachet", route:"Oral", therapeutic:"Electrolyte", inn:"ORS", price:65},
            {id:230, product:"Zinc Sulphate 20mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Mineral Supplement", inn:"Zinc", price:180},
            {id:231, product:"Albendazole 400mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Anthelmintic", inn:"Albendazole", price:240},
            {id:232, product:"Mebendazole 100mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Anthelmintic", inn:"Mebendazole", price:110},
            {id:233, product:"Tetanus Toxoid Vaccine", form:"Vial", route:"Injection", therapeutic:"Vaccine", inn:"Tetanus Toxoid", price:890},
            {id:234, product:"Hepatitis B Vaccine", form:"Vial", route:"Injection", therapeutic:"Vaccine", inn:"Hepatitis B", price:1850},
            {id:235, product:"Xefo 8mg Tablets", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Lornoxicam", price:920},
            {id:236, product:"Flagyl 400mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Antiprotozoal", inn:"Metronidazole", price:240},
            {id:237, product:"Augmentin 625mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Beta-Lactam", inn:"Amoxicillin + Clavulanic", price:980},
            {id:238, product:"Ceftriaxone 1g Injection", form:"Vial", route:"Injection", therapeutic:"Cephalosporin", inn:"Ceftriaxone", price:650},
            {id:239, product:"Gentamicin 80mg Injection", form:"Ampoule", route:"Injection", therapeutic:"Aminoglycoside", inn:"Gentamicin", price:180},
            {id:240, product:"Dexamethasone 4mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Corticosteroid", inn:"Dexamethasone", price:320},
            {id:241, product:"Prednisolone 5mg Tablets", form:"Tablet", route:"Oral", therapeutic:"Corticosteroid", inn:"Prednisolone", price:280},
            {id:242, product:"Hydrocortisone Cream 1%", form:"Cream", route:"Topical", therapeutic:"Corticosteroid", inn:"Hydrocortisone", price:420},
            {id:243, product:"Clotrimazole 1% Cream", form:"Cream", route:"Topical", therapeutic:"Antifungal", inn:"Clotrimazole", price:260},
            {id:244, product:"Mupirocin Ointment", form:"Ointment", route:"Topical", therapeutic:"Antibiotic", inn:"Mupirocin", price:680},
            {id:245, product:"Permethrin 5% Cream", form:"Cream", route:"Topical", therapeutic:"Scabicide", inn:"Permethrin", price:750},
            {id:246, product:"Benzyl Benzoate 25%", form:"Lotion", route:"Topical", therapeutic:"Scabicide", inn:"Benzyl Benzoate", price:320},
            {id:247, product:"Calamine Lotion", form:"Lotion", route:"Topical", therapeutic:"Antipruritic", inn:"Calamine", price:280},
            {id:248, product:"Aqueous Cream", form:"Cream", route:"Topical", therapeutic:"Emollient", inn:"Aqueous Cream", price:450},
            {id:249, product:"Surgical Spirit", form:"Solution", route:"Topical", therapeutic:"Antiseptic", inn:"Surgical Spirit", price:380},
            {id:250, product:"Povidone Iodine 10% Solution", form:"Solution", route:"Topical", therapeutic:"Antiseptic", inn:"Povidone Iodine", price:520},
            {id:251, product:"Cloximed Capsules 250mg", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam Antibacterials", inn:"Ampicillin + Cloxacillin", price:420},
            {id:252, product:"Medibenin Capsules 250mg", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam Antibacterials", inn:"Cloxacillin", price:450},
            {id:253, product:"Mediceff Capsules 500mg", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam Antibacterials", inn:"Cefalexin", price:520},
            {id:254, product:"Mediprofen Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"NSAID", inn:"Ibuprofen", price:320},
            {id:255, product:"Medistatin Oral Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antifungal", inn:"Nystatin", price:380},
            {id:256, product:"Medigan Syrup", form:"Syrup", route:"Oral", therapeutic:"Antihistamine", inn:"Promethazine", price:420},
            {id:257, product:"Mediphenicol Ear Drops", form:"Ear Drops", route:"Auricular", therapeutic:"Antibiotic", inn:"Chloramphenicol", price:280},
            {id:258, product:"Medithrocin Dry Powder", form:"Dry Suspension", route:"Oral", therapeutic:"Macrolide", inn:"Erythromycin", price:480},
            {id:259, product:"Medizole B Cream", form:"Cream", route:"Topical", therapeutic:"Antifungal + Corticosteroid", inn:"Clotrimazole + Betamethasone", price:420},
            {id:260, product:"Burnimed Cream", form:"Cream", route:"Topical", therapeutic:"Sulfonamide", inn:"Silver Sulphadiazine", price:450},
            {id:261, product:"Allermed Cream", form:"Cream", route:"Topical", therapeutic:"Antihistamine", inn:"Mepyramine", price:380},
            {id:262, product:"Neopeptine Capsule", form:"Capsule", route:"Oral", therapeutic:"Digestive Enzymes", inn:"Alpha Amylase + Papain", price:520},
            {id:263, product:"Panfurex 200mg Capsules", form:"Capsule", route:"Oral", therapeutic:"Intestinal Anti-infective", inn:"Nifuroxazide", price:680},
            {id:264, product:"Mag 2 Tablets", form:"Tablet", route:"Oral", therapeutic:"Mineral Supplement", inn:"Magnesium", price:450},
            {id:265, product:"Ticasse BD Suspension", form:"Powder for Suspension", route:"Oral", therapeutic:"Beta-Lactam", inn:"Amoxicillin + Clavulanic Acid", price:750},
            {id:266, product:"Dermofix 2% Cream", form:"Cream", route:"Topical", therapeutic:"Antifungal", inn:"Sertaconazole", price:926},
            {id:267, product:"Cetraxal Plus Ear Drops", form:"Ear Solution", route:"Auricular", therapeutic:"Antibiotic + Corticosteroid", inn:"Ciprofloxacin + Fluocinolone", price:1250},
            {id:268, product:"Dislep Injection", form:"Injection", route:"Parenteral", therapeutic:"Gastrokinetic", inn:"Levosulpiride", price:980},
            {id:269, product:"Cloximed Dry Powder Suspension", form:"Dry Suspension", route:"Oral", therapeutic:"Beta-Lactam", inn:"Ampicillin + Cloxacillin", price:380},
            {id:270, product:"Medibenin Dry Suspension", form:"Dry Suspension", route:"Oral", therapeutic:"Beta-Lactam", inn:"Cloxacillin", price:420},
            {id:271, product:"Mediceff Dry Suspension", form:"Dry Suspension", route:"Oral", therapeutic:"Beta-Lactam", inn:"Cefalexin", price:480},
            {id:272, product:"Medipirox Capsules", form:"Capsule", route:"Oral", therapeutic:"NSAID", inn:"Piroxicam", price:520},
            {id:273, product:"Medistop Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Intestinal Adsorbent", inn:"Kaolin + Pectin", price:350},
            {id:274, product:"Womkil Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Anthelmintic", inn:"Mebendazole", price:280},
            {id:275, product:"Meditrax Syrup", form:"Syrup", route:"Oral", therapeutic:"Anthelmintic", inn:"Levamisole", price:320},
            {id:276, product:"Meditron Expectorant", form:"Syrup", route:"Oral", therapeutic:"Cough", inn:"Chlorphenamine + Ammonium Chloride", price:420},
            {id:277, product:"Meditron Syrup", form:"Syrup", route:"Oral", therapeutic:"Antihistamine", inn:"Chlorphenamine", price:380},
            {id:278, product:"Medicycline Skin Ointment", form:"Ointment", route:"Topical", therapeutic:"Antibiotic", inn:"Tetracycline", price:320},
            {id:279, product:"Mediderm Cream", form:"Cream", route:"Topical", therapeutic:"Corticosteroid", inn:"Hydrocortisone", price:280},
            {id:280, product:"Mediderm Ointment", form:"Ointment", route:"Topical", therapeutic:"Corticosteroid", inn:"Hydrocortisone", price:280},
            {id:281, product:"Mediphenicol Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antibiotic", inn:"Chloramphenicol", price:420},
            {id:282, product:"Septrimed Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antibiotic", inn:"Sulphamethoxazole + Trimethoprim", price:380},
            {id:283, product:"Scabkil Application", form:"Cutaneous Emulsion", route:"Topical", therapeutic:"Scabicide", inn:"Benzyl Benzoate", price:320},
            {id:284, product:"Whitfields Ointment", form:"Ointment", route:"Topical", therapeutic:"Antifungal", inn:"Salicylic Acid + Benzoic Acid", price:280},
            {id:285, product:"Coldcap Day & Night Capsules", form:"Capsule", route:"Oral", therapeutic:"Cold Preparation", inn:"Paracetamol + Chlorpheniramine", price:450},
            {id:286, product:"Lofnac 50 Tablets", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Diclofenac", price:420},
            {id:287, product:"Sonaderm GM Cream", form:"Cream", route:"Topical", therapeutic:"Corticosteroid + Antifungal + Antibiotic", inn:"Clobetasol + Gentamicin + Miconazole", price:520},
            {id:288, product:"Tusq DX Liquid", form:"Oral Liquid", route:"Oral", therapeutic:"Cough & Cold", inn:"Dextromethorphan + Chlorpheniramine", price:480},
            {id:289, product:"Extacef 200 DT", form:"Dispersible Tablet", route:"Oral", therapeutic:"Cephalosporin", inn:"Cefixime", price:650},
            {id:290, product:"Lofnac 100 Suppository", form:"Suppository", route:"Rectal", therapeutic:"NSAID", inn:"Diclofenac", price:580},
            {id:291, product:"Finmol Tablet", form:"Tablet", route:"Oral", therapeutic:"Analgesic", inn:"Paracetamol + Ibuprofen", price:320},
            {id:292, product:"Lofnac MR Tablet", form:"Tablet", route:"Oral", therapeutic:"Muscle Relaxant + NSAID", inn:"Diclofenac + Chlorzoxazone", price:520},
            {id:293, product:"G-Alfenac P Tablet", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Aceclofenac + Paracetamol", price:480},
            {id:294, product:"P-Alaxin Oral Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antimalarial", inn:"Dihydroartemisinin + Piperaquine", price:750},
            {id:295, product:"Lonart Forte Tablet", form:"Tablet", route:"Oral", therapeutic:"Antimalarial", inn:"Artemether + Lumefantrine", price:450},
            {id:296, product:"Lonart DS Tablet", form:"Tablet", route:"Oral", therapeutic:"Antimalarial", inn:"Artemether + Lumefantrine", price:650},
            {id:297, product:"Bg_Zole 400 Chewable", form:"Chewable Tablet", route:"Oral", therapeutic:"Anthelmintic", inn:"Albendazole", price:280},
            {id:298, product:"Clobit Cream", form:"Cream", route:"Topical", therapeutic:"Corticosteroid", inn:"Clobetasol", price:520},
            {id:299, product:"Meftal - P Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"NSAID", inn:"Mefenamic Acid", price:420},
            {id:300, product:"Tusq X Liquid", form:"Oral Liquid", route:"Oral", therapeutic:"Cough", inn:"Terbutaline + Bromhexine", price:480},
            {id:301, product:"Flux Injection 500mg", form:"Powder for Injection", route:"IV", therapeutic:"Beta-Lactam Antibacterials", inn:"Flucloxacillin", price:650},
            {id:302, product:"Truston Tablets", form:"Tablet", route:"Oral", therapeutic:"Analgesic", inn:"Paracetamol + Ibuprofen", price:320},
            {id:303, product:"Flagimed Suspension", form:"Suspension", route:"Oral", therapeutic:"Antiprotozoal", inn:"Metronidazole", price:280},
            {id:304, product:"D-Artepp Tablets", form:"Tablet", route:"Oral", therapeutic:"Antimalarial", inn:"Dihydroartemisinin + Piperaquine", price:850},
            {id:305, product:"Actilyse Injection", form:"Injection", route:"IV", therapeutic:"Thrombolytic", inn:"Alteplase", price:18500},
            {id:306, product:"Mag 2 Ampoules", form:"Ampoule", route:"IV", therapeutic:"Magnesium Supplement", inn:"Magnesium", price:1250},
            {id:307, product:"Panfurex Tablets", form:"Tablet", route:"Oral", therapeutic:"Antidiarrhoeal", inn:"Racecadotril", price:680},
            {id:308, product:"Ticasse Tablets", form:"Tablet", route:"Oral", therapeutic:"Anticoagulant", inn:"Ticagrelor", price:1840},
            {id:309, product:"Medihex Concentrated Solution", form:"Solution", route:"Topical", therapeutic:"Antiseptic", inn:"Chlorhexidine", price:420},
            {id:310, product:"Xefo Rapid 8mg", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Lornoxicam", price:920},
            {id:311, product:"Bronquidiazina CR Suspension", form:"Suspension", route:"Oral", therapeutic:"Cough", inn:"Bromhexine", price:1088},
            {id:312, product:"Clavace 1g Injection", form:"Injection", route:"IV", therapeutic:"Antibiotics", inn:"Amoxicillin + Clavulanic", price:1450},
            {id:313, product:"Cachmax 400mg DS", form:"Suspension", route:"Oral", therapeutic:"Antibiotics", inn:"Cefixime", price:480},
            {id:314, product:"Ultane 250ml", form:"Liquid", route:"Inhalation", therapeutic:"Anaesthetic", inn:"Sevoflurane", price:44148},
            {id:315, product:"BioGaia Protectis", form:"Drops", route:"Oral", therapeutic:"Probiotic", inn:"Lactobacillus reuteri", price:1750},
            {id:316, product:"Airtal 100mg", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Aceclofenac", price:1092},
            {id:317, product:"Emitino 8mg", form:"Tablet", route:"Oral", therapeutic:"Antiemetic", inn:"Ondansetron", price:974},
            {id:318, product:"Nebilet 5mg", form:"Tablet", route:"Oral", therapeutic:"Antihypertensive", inn:"Nebivolol", price:3304},
            {id:319, product:"Ranexa 500mg", form:"Tablet", route:"Oral", therapeutic:"Anti-anginal", inn:"Ranolazine", price:8792},
            {id:320, product:"Priligy 30mg", form:"Tablet", route:"Oral", therapeutic:"PE Treatment", inn:"Dapoxetine", price:3456},
            {id:321, product:"Aldara 5% Cream", form:"Cream", route:"Topical", therapeutic:"Immunomodulator", inn:"Imiquimod", price:15968},
            {id:322, product:"Pabrinex High Potency", form:"Ampoules", route:"Injection", therapeutic:"Vitamins", inn:"B & C Vitamins", price:7068},
            {id:323, product:"Somazina 1000mg", form:"Injection", route:"IV", therapeutic:"Neurological", inn:"Citicoline", price:7238},
            {id:324, product:"Ketesse 25mg", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Dexketoprofen", price:1438},
            {id:325, product:"Bifril 30mg", form:"Tablet", route:"Oral", therapeutic:"ACE Inhibitor", inn:"Zofenopril", price:2544},
            {id:326, product:"Regen-DTM Gel", form:"Gel", route:"Topical", therapeutic:"Wound Healing", inn:"EGF", price:4220},
            {id:327, product:"Indirab Rabies Vaccine", form:"Vial", route:"Injection", therapeutic:"Vaccine", inn:"Rabies", price:1334},
            {id:328, product:"Typbar Typhoid Vaccine", form:"Vial", route:"Injection", therapeutic:"Vaccine", inn:"Typhoid", price:2934},
            {id:329, product:"Revac B+ Hepatitis B", form:"Vial", route:"Injection", therapeutic:"Vaccine", inn:"Hepatitis B", price:3668},
            {id:330, product:"Sekisan Syrup", form:"Syrup", route:"Oral", therapeutic:"Cough", inn:"Cloperastine", price:1012},
            {id:331, product:"Coldcap Original Capsules", form:"Capsule", route:"Oral", therapeutic:"Cold Preparation", inn:"Paracetamol + Pseudoephedrine", price:450},
            {id:332, product:"Lofnac 50 Suppository", form:"Suppository", route:"Rectal", therapeutic:"NSAID", inn:"Diclofenac Sodium", price:580},
            {id:333, product:"Finmol Tablet", form:"Tablet", route:"Oral", therapeutic:"Analgesic", inn:"Paracetamol + Ibuprofen", price:320},
            {id:334, product:"Lofnac MR Tablet", form:"Tablet", route:"Oral", therapeutic:"NSAID + Muscle Relaxant", inn:"Diclofenac + Chlorzoxazone", price:520},
            {id:335, product:"G-Alfenac P Tablet", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Aceclofenac + Paracetamol", price:480},
            {id:336, product:"P-Alaxin Oral Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antimalarial", inn:"Dihydroartemisinin + Piperaquine", price:750},
            {id:337, product:"Lonart DS Tablet", form:"Tablet", route:"Oral", therapeutic:"Antimalarial", inn:"Artemether + Lumefantrine", price:650},
            {id:338, product:"Bg_Zole 400 Chewable", form:"Chewable Tablet", route:"Oral", therapeutic:"Anthelmintic", inn:"Albendazole", price:280},
            {id:339, product:"Clobit Cream", form:"Cream", route:"Topical", therapeutic:"Corticosteroid", inn:"Clobetasol", price:520},
            {id:340, product:"Meftal-P Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"NSAID", inn:"Mefenamic Acid", price:420},
            {id:341, product:"Tusq DX Liquid", form:"Oral Liquid", route:"Oral", therapeutic:"Cough & Cold", inn:"Dextromethorphan + Chlorpheniramine", price:480},
            {id:342, product:"Extacef 100 DT", form:"Dispersible Tablet", route:"Oral", therapeutic:"Cephalosporin", inn:"Cefixime", price:550},
            {id:343, product:"Lofnac 100 Suppository", form:"Suppository", route:"Rectal", therapeutic:"NSAID", inn:"Diclofenac", price:580},
            {id:344, product:"G-Alfenac P Tablet", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Aceclofenac + Paracetamol", price:480},
            {id:345, product:"P-Alaxin Tablet", form:"Tablet", route:"Oral", therapeutic:"Antimalarial", inn:"Dihydroartemisinin + Piperaquine", price:680},
            {id:346, product:"Clob Cream", form:"Cream", route:"Topical", therapeutic:"Antifungal", inn:"Clotrimazole", price:260},
            {id:347, product:"Meftal Forte Tablet", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Mefenamic Acid", price:520},
            {id:348, product:"Tusq X Liquid", form:"Oral Liquid", route:"Oral", therapeutic:"Cough", inn:"Terbutaline + Bromhexine", price:480},
            {id:349, product:"Extacef 200 DT", form:"Dispersible Tablet", route:"Oral", therapeutic:"Cephalosporin", inn:"Cefixime", price:650},
            {id:350, product:"Lofnac 75 Tablet", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Diclofenac", price:420},
            {id:351, product:"Gacet 500mg Suppository", form:"Suppository", route:"Rectal", therapeutic:"Analgesic", inn:"Paracetamol", price:380},
            {id:352, product:"Vagid 200 Pessary", form:"Pessary", route:"Vaginal", therapeutic:"Antifungal", inn:"Clotrimazole", price:520},
            {id:353, product:"GV-Fluc 150 Capsule", form:"Capsule", route:"Oral", therapeutic:"Antifungal", inn:"Fluconazole", price:280},
            {id:354, product:"Lonart Oral Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antimalarial", inn:"Artemether + Lumefantrine", price:850},
            {id:355, product:"Clotrine 100 Pessary", form:"Pessary", route:"Vaginal", therapeutic:"Antifungal", inn:"Clotrimazole", price:420},
            {id:356, product:"Ethro-250 Tablet", form:"Tablet", route:"Oral", therapeutic:"Macrolide", inn:"Erythromycin", price:520},
            {id:357, product:"Peflobid 400 Tablet", form:"Tablet", route:"Oral", therapeutic:"Quinolone", inn:"Pefloxacin", price:680},
            {id:358, product:"Cetamol Junior Tablet", form:"Tablet", route:"Oral", therapeutic:"Analgesic", inn:"Paracetamol", price:120},
            {id:359, product:"Vagid 500 Pessary", form:"Pessary", route:"Vaginal", therapeutic:"Antifungal", inn:"Clotrimazole", price:650},
            {id:360, product:"Gacet 1g Suppository", form:"Suppository", route:"Rectal", therapeutic:"Analgesic", inn:"Paracetamol", price:520},
            {id:361, product:"Lonart Dispersible Tablet", form:"Dispersible Tablet", route:"Oral", therapeutic:"Antimalarial", inn:"Artemether + Lumefantrine", price:650},
            {id:362, product:"Candizole 150 Capsule", form:"Capsule", route:"Oral", therapeutic:"Antifungal", inn:"Fluconazole", price:280},
            {id:363, product:"Clotrine 200 Pessary", form:"Pessary", route:"Vaginal", therapeutic:"Antifungal", inn:"Clotrimazole", price:520},
            {id:364, product:"Clotrine Cream", form:"Cream", route:"Topical", therapeutic:"Antifungal", inn:"Clotrimazole", price:260},
            {id:365, product:"Kontrac 200 Tablet", form:"Tablet", route:"Oral", therapeutic:"Prostaglandin", inn:"Misoprostol", price:850},
            {id:366, product:"L Montus Tablet", form:"Tablet", route:"Oral", therapeutic:"Antihistamine + Leukotriene", inn:"Levocetirizine + Montelukast", price:720},
            {id:367, product:"Metfil Tablet", form:"Tablet", route:"Oral", therapeutic:"Antidiabetic", inn:"Metformin", price:180},
            {id:368, product:"Redin Plus Capsule", form:"Capsule", route:"Oral", therapeutic:"Haematinic", inn:"Iron + Vitamins", price:520},
            {id:369, product:"GVither Forte Injection", form:"Injection", route:"Intramuscular", therapeutic:"Antimalarial", inn:"Artemether", price:950},
            {id:370, product:"Acculol Eye Drops", form:"Eye Drops", route:"Ophthalmic", therapeutic:"Beta Blocker", inn:"Betaxolol", price:680},
            {id:371, product:"Optodexine Eye Drops", form:"Eye Drops", route:"Ophthalmic", therapeutic:"Antibiotic + Steroid", inn:"Chloramphenicol + Dexamethasone", price:520},
            {id:372, product:"Atm-200 Syrup", form:"Syrup", route:"Oral", therapeutic:"Macrolide", inn:"Azithromycin", price:680},
            {id:373, product:"Atm-250 Tablet", form:"Tablet", route:"Oral", therapeutic:"Macrolide", inn:"Azithromycin", price:520},
            {id:374, product:"Atm-500 Tablet", form:"Tablet", route:"Oral", therapeutic:"Macrolide", inn:"Azithromycin", price:920},
            {id:375, product:"Ceprolen-D Eye Drops", form:"Eye Drops", route:"Ophthalmic", therapeutic:"Antibiotic + Steroid", inn:"Ciprofloxacin + Dexamethasone", price:680},
            {id:376, product:"Ceprolen Eye Drops", form:"Eye Drops", route:"Ophthalmic", therapeutic:"Antibiotic", inn:"Ciprofloxacin", price:520},
            {id:377, product:"Aldara 5% Cream", form:"Cream", route:"Topical", therapeutic:"Immunomodulator", inn:"Imiquimod", price:15968},
            {id:378, product:"Febrex Plus Syrup", form:"Syrup", route:"Oral", therapeutic:"Cold & Flu", inn:"Paracetamol + Phenylephrine", price:420},
            {id:379, product:"Febrex Plus Tablet", form:"Tablet", route:"Oral", therapeutic:"Cold & Flu", inn:"Paracetamol + Phenylephrine", price:280},
            {id:380, product:"Hemsyl-500 Tablet", form:"Tablet", route:"Oral", therapeutic:"Haemostatic", inn:"Etamsylate", price:520},
            {id:381, product:"Hemsyl Injection", form:"Injection", route:"Intramuscular", therapeutic:"Haemostatic", inn:"Etamsylate", price:850},
            {id:382, product:"Glurenor Tablet", form:"Tablet", route:"Oral", therapeutic:"Antidiabetic", inn:"Gliquidone", price:680},
            {id:383, product:"Oxipod 50mg Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Cephalosporin", inn:"Cefpodoxime", price:650},
            {id:384, product:"Remidin Mouthwash", form:"Mouthwash", route:"Oral", therapeutic:"Antiseptic", inn:"Chlorhexidine", price:420},
            {id:385, product:"Triz Syrup", form:"Syrup", route:"Oral", therapeutic:"Antihistamine", inn:"Cetirizine", price:320},
            {id:386, product:"Triz Tablet", form:"Tablet", route:"Oral", therapeutic:"Antihistamine", inn:"Cetirizine", price:140},
            {id:387, product:"Tuspel Cough Syrup", form:"Syrup", route:"Oral", therapeutic:"Cough", inn:"Diphenhydramine + Ammonium Chloride", price:420},
            {id:388, product:"Tuspel Plus Syrup", form:"Syrup", route:"Oral", therapeutic:"Cough", inn:"Salbutamol + Bromhexine", price:480},
            {id:389, product:"Amosun Granules", form:"Granules", route:"Oral", therapeutic:"Beta-Lactam", inn:"Amoxicillin", price:380},
            {id:390, product:"Lioton 1000 Gel", form:"Gel", route:"Topical", therapeutic:"Venous", inn:"Heparin", price:1108},
            {id:391, product:"Miocamen Suspension", form:"Suspension", route:"Oral", therapeutic:"Macrolide", inn:"Midecamycin", price:680},
            {id:392, product:"Metforal 500mg Tablet", form:"Tablet", route:"Oral", therapeutic:"Antidiabetic", inn:"Metformin", price:180},
            {id:393, product:"Metforal 850mg Tablet", form:"Tablet", route:"Oral", therapeutic:"Antidiabetic", inn:"Metformin", price:250},
            {id:394, product:"Tenolol-50 Tablet", form:"Tablet", route:"Oral", therapeutic:"Beta Blocker", inn:"Atenolol", price:320},
            {id:395, product:"Osteoflam Injection", form:"Injection", route:"Intramuscular", therapeutic:"NSAID", inn:"Diclofenac", price:180},
            {id:396, product:"Osteoflam Tablet", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Diclofenac", price:220},
            {id:397, product:"Otorex Ear Drops", form:"Ear Drops", route:"Auricular", therapeutic:"Ear Wax Removal", inn:"Paradichlorobenzene + Benzocaine", price:520},
            {id:398, product:"Coldcap Syrup", form:"Syrup", route:"Oral", therapeutic:"Cold Preparation", inn:"Paracetamol + Chlorpheniramine", price:420},
            {id:399, product:"Zomax 500mg Capsule", form:"Capsule", route:"Oral", therapeutic:"Macrolide", inn:"Azithromycin", price:680},
            {id:400, product:"Zomax 250mg Capsule", form:"Capsule", route:"Oral", therapeutic:"Macrolide", inn:"Azithromycin", price:520},
            {id:501, product:"Medihex Concentrated Solution", form:"Cutaneous Solution", route:"Topical", therapeutic:"Other Dermatological Preparations", inn:"Cetrimide + Chlorhexidine", price:420},
            {id:502, product:"Flux Injection", form:"Powder for Injection", route:"Intravenous", therapeutic:"Beta-Lactam Antibacterials", inn:"Flucloxacillin", price:650},
            {id:503, product:"Truston Tablets", form:"Tablet", route:"Oral", therapeutic:"Analgesics", inn:"Paracetamol + Ibuprofen", price:320},
            {id:504, product:"Flagimed Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antiprotozoal", inn:"Metronidazole", price:280},
            {id:505, product:"D-Artepp Tablets", form:"Film-Coated Tablet", route:"Oral", therapeutic:"Antimalarial", inn:"Dihydroartemisinin + Piperaquine", price:850},
            {id:506, product:"Actilyse Injection", form:"Powder + Solvent", route:"Intravenous", therapeutic:"Antithrombotic", inn:"Alteplase", price:18500},
            {id:507, product:"Neopeptine Capsule", form:"Capsule", route:"Oral", therapeutic:"Digestive Enzymes", inn:"Alpha Amylase + Papain", price:520},
            {id:508, product:"Allermed Cream", form:"Cream", route:"Topical", therapeutic:"Antihistamines", inn:"Mepyramine Maleate", price:380},
            {id:509, product:"Burnimed Cream", form:"Cream", route:"Topical", therapeutic:"Sulfonamides", inn:"Silver Sulphadiazine", price:450},
            {id:510, product:"Cloximed Capsules", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam", inn:"Ampicillin + Cloxacillin", price:420},
            {id:511, product:"Cloximed Dry Powder Suspension", form:"Dry Suspension", route:"Oral", therapeutic:"Beta-Lactam", inn:"Ampicillin + Cloxacillin", price:380},
            {id:512, product:"Medibenin Capsules", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam", inn:"Cloxacillin", price:450},
            {id:513, product:"Mediceff Capsules", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam", inn:"Cefalexin", price:520},
            {id:514, product:"Mediprofen Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"NSAID", inn:"Ibuprofen", price:320},
            {id:515, product:"Medistatin Oral Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antifungal", inn:"Nystatin", price:380},
            {id:516, product:"Medigan Syrup", form:"Syrup", route:"Oral", therapeutic:"Antihistamine", inn:"Promethazine", price:420},
            {id:517, product:"Mediphenicol Ear Drops", form:"Ear Drops", route:"Topical", therapeutic:"Antibiotic", inn:"Chloramphenicol", price:280},
            {id:518, product:"Medithrocin Dry Powder", form:"Dry Suspension", route:"Oral", therapeutic:"Macrolide", inn:"Erythromycin", price:480},
            {id:519, product:"Medizole B Cream", form:"Cream", route:"Topical", therapeutic:"Antifungal + Steroid", inn:"Clotrimazole + Betamethasone", price:420},
            {id:520, product:"Moximed Dry Powder Suspension", form:"Dry Suspension", route:"Oral", therapeutic:"Beta-Lactam", inn:"Amoxicillin", price:380},
            {id:601, product:"Medihex Concentrated Solution", form:"Cutaneous Solution", route:"Topical", therapeutic:"Other Dermatological Preparations", inn:"Cetrimide + Chlorhexidine", price:420},
            {id:602, product:"Flux Injection", form:"Powder for Injection", route:"Intravenous", therapeutic:"Beta-Lactam Antibacterials", inn:"Flucloxacillin", price:650},
            {id:603, product:"Xefo 8mg", form:"Tablet", route:"Oral", therapeutic:"NSAID", inn:"Lornoxicam", price:920},
            {id:604, product:"Truston Tablets", form:"Tablet", route:"Oral", therapeutic:"Analgesics", inn:"Paracetamol + Ibuprofen", price:320},
            {id:605, product:"Flagimed Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antiprotozoal", inn:"Metronidazole", price:280},
            {id:606, product:"D-Artepp Tablets", form:"Film-Coated Tablet", route:"Oral", therapeutic:"Antimalarial", inn:"Dihydroartemisinin + Piperaquine", price:850},
            {id:607, product:"Actilyse", form:"Powder + Solvent", route:"Intravenous", therapeutic:"Antithrombotic", inn:"Alteplase", price:18500},
            {id:608, product:"Neopeptine Capsule", form:"Capsule", route:"Oral", therapeutic:"Digestive Enzymes", inn:"Alpha Amylase + Papain", price:520},
            {id:609, product:"Cloximed Capsules", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam", inn:"Ampicillin + Cloxacillin", price:420},
            {id:610, product:"Allermed Cream", form:"Cream", route:"Topical", therapeutic:"Antihistamine", inn:"Mepyramine Maleate", price:380},
            {id:611, product:"Burnimed Cream", form:"Cream", route:"Topical", therapeutic:"Sulfonamide", inn:"Silver Sulphadiazine", price:450},
            {id:612, product:"Medibenin Capsules", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam", inn:"Cloxacillin", price:450},
            {id:613, product:"Mediceff Capsules", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam", inn:"Cefalexin", price:520},
            {id:614, product:"Mediprofen Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"NSAID", inn:"Ibuprofen", price:320},
            {id:615, product:"Medizole Cream", form:"Cream", route:"Topical", therapeutic:"Antifungal", inn:"Clotrimazole", price:260},
            {id:616, product:"Moximed Capsules", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam", inn:"Amoxicillin", price:420},
            {id:617, product:"Medithrocin Dry Powder", form:"Dry Suspension", route:"Oral", therapeutic:"Macrolide", inn:"Erythromycin", price:480},
            {id:618, product:"Medistatin Oral Suspension", form:"Suspension", route:"Oral", therapeutic:"Antifungal", inn:"Nystatin", price:380},
            {id:619, product:"Medigan Syrup", form:"Syrup", route:"Oral", therapeutic:"Antihistamine", inn:"Promethazine", price:420},
            {id:620, product:"Mediphenicol Ear Drops", form:"Ear Drops", route:"Auricular", therapeutic:"Antibiotic", inn:"Chloramphenicol", price:280},
            {id:621, product:"Cloximed Capsules", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam Antibacterials", inn:"Ampicillin + Cloxacillin", price:420},
            {id:622, product:"Cloximed Dry Powder Suspension", form:"Dry Suspension", route:"Oral", therapeutic:"Beta-Lactam Antibacterials", inn:"Ampicillin + Cloxacillin", price:380},
            {id:623, product:"Medibenin Capsules 250mg", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam Antibacterials", inn:"Cloxacillin", price:450},
            {id:624, product:"Mediceff Capsules 500mg", form:"Capsule", route:"Oral", therapeutic:"Beta-Lactam Antibacterials", inn:"Cefalexin", price:520},
            {id:625, product:"Mediprofen Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"NSAID", inn:"Ibuprofen", price:320},
            {id:626, product:"Medistatin Oral Suspension", form:"Oral Suspension", route:"Oral", therapeutic:"Antifungal", inn:"Nystatin", price:380},
            {id:627, product:"Medigan Syrup", form:"Syrup", route:"Oral", therapeutic:"Antihistamine", inn:"Promethazine", price:420},
            {id:628, product:"Mediphenicol Ear Drops", form:"Ear Drops", route:"Auricular", therapeutic:"Antibiotic", inn:"Chloramphenicol", price:280},
            {id:629, product:"Medithrocin Dry Powder", form:"Dry Suspension", route:"Oral", therapeutic:"Macrolide", inn:"Erythromycin", price:480},
            {id:630, product:"Medizole B Cream", form:"Cream", route:"Topical", therapeutic:"Antifungal + Corticosteroid", inn:"Clotrimazole + Betamethasone", price:420},
            {id:631, product:"Burnimed Cream", form:"Cream", route:"Topical", therapeutic:"Sulfonamide", inn:"Silver Sulphadiazine", price:450},
            {id:632, product:"Allermed Cream", form:"Cream", route:"Topical", therapeutic:"Antihistamine", inn:"Mepyramine Maleate", price:380},
            {id:633, product:"Neopeptine Capsule", form:"Capsule", route:"Oral", therapeutic:"Digestive Enzymes", inn:"Alpha Amylase + Papain", price:520},
            {id:634, product:"Panfurex Capsules", form:"Capsule", route:"Oral", therapeutic:"Intestinal Anti-infective", inn:"Nifuroxazide", price:680},
            {id:635, product:"Mag 2 Tablets", form:"Tablet", route:"Oral", therapeutic:"Mineral Supplement", inn:"Magnesium", price:450},
            {id:636, product:"Ticasse Powder for Suspension", form:"Powder for Suspension", route:"Oral", therapeutic:"Beta-Lactam", inn:"Amoxicillin + Clavulanic Acid", price:750},
            {id:637, product:"Dermofix Cream 2%", form:"Cream", route:"Topical", therapeutic:"Antifungal", inn:"Sertaconazole", price:926},
            {id:638, product:"Cetraxal Plus Ear Drops", form:"Ear Drops", route:"Auricular", therapeutic:"Corticosteroid + Antibiotic", inn:"Ciprofloxacin + Fluocinolone", price:1250},
            {id:639, product:"Dislep Injection", form:"Injectable", route:"Parenteral", therapeutic:"Gastrokinetic", inn:"Levosulpiride", price:980},
    {id:647, product:"Mamalait Granules 250g", form:"Granules", route:"Oral", therapeutic:"Supplement", inn:"", price:2200}
];

function getCartKey() {
    return currentUser ? `afyCart_${currentUser.email}` : 'afyCart_guest';
}

function loadData() {
    const savedCart = localStorage.getItem(getCartKey());
    cart = savedCart ? JSON.parse(savedCart) : [];

    const savedUser = localStorage.getItem('afyUser');
    if (savedUser) currentUser = JSON.parse(savedUser);

    updateUserUI();
    updateCartCount();
}

function updateUserUI() {
    const userInfo = document.getElementById('user-info');
    if (currentUser) {
        userInfo.textContent = `Logout (${currentUser.email.split('@')[0]})`;
    } else {
        userInfo.textContent = "Login";
    }
}

function handleUserClick() {
    if (currentUser) signOut();
    else showAuthModal();
}

function signOut() {
    if (confirm("Sign out?")) {
        currentUser = null;
        localStorage.removeItem('afyUser');
        updateUserUI();
        alert("Signed out successfully.");
    }
}
function closeSuccessModal() {
    document.getElementById("successModal").style.display = "none";
    showPage("shop");
}
// Auth functions (same as before)
function showAuthModal() {
    if (currentUser) return;
    document.getElementById('authModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('authModal').style.display = 'none';
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('modalTitle').textContent = isLoginMode ? "Login to AfyAccess" : "Create Account";
    document.getElementById('authBtn').textContent = isLoginMode ? "Login" : "Sign Up";
}

async function handleAuth() {
    // ... (your existing handleAuth function)
    // For now, using local simulation
    const email = document.getElementById('emailInput').value.trim().toLowerCase();
    if (email) {
        currentUser = { email };
        localStorage.setItem('afyUser', JSON.stringify(currentUser));
        updateUserUI();
        closeModal();
        alert("✅ Login Successful!");
    }
}

function forgotPassword() {
    alert("Password reset coming soon.");
}

// Cart functions (user-specific)
function saveCart() {
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
}
/*function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');

    // 🔥 FIX: always reset scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
} */
/*
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = "none";
    });

    const activePage = document.getElementById(pageId);
    activePage.style.display = "block";

    window.scrollTo(0, 0);
}
 */
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    document.getElementById(page).classList.add('active');

    if (page === 'cart') {
        renderCart();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.getElementById('cart-count').textContent = count;
    document.getElementById('cart-count-header').textContent = count;
}

function addToCart(id) {
    const product = medicines.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showCartNotification(`${product.product} added to cart`);
}

function renderCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding:60px; color:#666;">Your cart is empty</p>`;
        document.getElementById('cart-total').innerHTML = `<strong>Total: KSh 0</strong>`;
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = (item.price || 0) * (item.quantity || 1);
        total += itemTotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div style="flex:1">
                <strong>${item.product}</strong><br>
                <small>KSh ${item.price} × ${item.quantity || 1}</small>
            </div>
            <div style="display:flex;align-items:center;gap:12px">
                <button onclick="changeQuantity(${index}, -1)">–</button>
                <span>${item.quantity || 1}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeFromCart(${index})" style="color:red">Remove</button>
            </div>
            <div><strong>KSh ${itemTotal.toLocaleString()}</strong></div>
        `;
        container.appendChild(div);
    });

    document.getElementById('cart-total').innerHTML = `<strong>Total: KSh ${total.toLocaleString()}</strong>`;
}

function changeQuantity(index, change) {
    cart[index].quantity = Math.max(1, (cart[index].quantity || 1) + change);
    saveCart();
    renderCart();
    updateCartCount();
}

function removeFromCart(index) {
    if (confirm("Remove this item?")) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
        updateCartCount();
    }
}

/*function checkout() {
    if (cart.length === 0) return alert("Your cart is empty!");
    if (!currentUser) {
        alert("Please login first");
        showAuthModal();
        return;
    }

    const phone = prompt("Enter your phone number:");
    const address = prompt("Enter delivery address:");

    if (!phone || !address) return alert("Phone and address required");

    alert(`🎉 Order placed successfully!\nPhone: ${phone}\nAddress: ${address}`);
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
    showPage('shop');
}
*/

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (!currentUser) {
        alert("Please login first.");
        showAuthModal();
        return;
    }

    document.getElementById("checkoutModal").style.display = "flex";
}
// Shop functions
function renderProducts(data) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${item.product}</h3>
            <p style="color:#64748b;">${item.therapeutic || ''}</p>
            <p><strong>${item.form || ''}</strong> • ${item.route || ''}</p>
            <p style="font-size:1.7rem; color:#10b981; font-weight:bold; margin:12px 0;">
                KSh ${(item.price || 0).toLocaleString()}
            </p>
            <button onclick="addToCart(${item.id}); event.stopImmediatePropagation()" class="add-btn">
                Add to Cart
            </button>
        `;
        grid.appendChild(card);
    });
}

function filterProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const cls = document.getElementById('classFilter').value;
    const filtered = allProducts.filter(m => {
        const match = !term || (m.product && m.product.toLowerCase().includes(term));
        const catMatch = !cls || m.therapeutic === cls;
        return match && catMatch;
    });
    renderProducts(filtered);
}

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    if (page === 'cart') renderCart();
}

// Initialize
window.onload = () => {
    loadData();
    renderProducts(medicines);

    const classes = [...new Set(medicines.map(m => m.therapeutic).filter(Boolean))].sort();
    const select = document.getElementById('classFilter');
    classes.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        select.appendChild(opt);
    });
};
function closeCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
}
function submitOrder() {

    const phone = document.getElementById("checkoutPhone").value.trim();
    const address = document.getElementById("checkoutAddress").value.trim();

    if (!phone) {
        alert("Phone number is required.");
        return;
    }

    if (!address) {
        alert("Delivery address is required.");
        return;
    }

    // Put phone and address into success modal
    document.getElementById("successPhone").textContent = phone;
    document.getElementById("successAddress").textContent = address;

    cart = [];
    saveCart();
    renderCart();
    updateCartCount();

    closeCheckout();

    // Show success modal
    document.getElementById("successModal").style.display = "flex";
}

function showCartNotification(message) {
    const notification = document.getElementById("cartNotification");

    notification.textContent = message;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}